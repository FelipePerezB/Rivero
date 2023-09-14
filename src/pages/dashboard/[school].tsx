import React, { useState } from "react";
import Layout from "src/layout/Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Button from "@components/Button";
import Table from "@components/Table";
import Modal from "@components/modals/modal/Modal";
import StandardInput from "@components/inputs/StandardInput/StandardInput";
import { api } from "src/getDoc/utils/api";
import { useMutation } from "@apollo/client";
import {
  CreateGradeDocument,
  GetGradesDocument,
  GetGradesQuery,
  GetSchoolsDocument,
  GetUsersDocument,
  GetUsersQuery,
} from "src/gql/graphql";
import toast from "react-hot-toast";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { client } from "src/service/client";
import EditButton from "@components/button/editButton/EditButton";
import updateGrade from "src/service/querys/grade/updateGrade";
import { useRouter } from "next/router";

const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

type statusType = "Enviada" | "Fallida" | "Pendiente";

type invitationStatus = {
  [label: string]: statusType;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data, error } = await client.query({
    query: GetSchoolsDocument,
    fetchPolicy: "network-only",
  });
  if (!data?.schools || error) throw new Error("Failed to request");
  return {
    paths: data.schools?.map((school) => ({
      params: {
        path: school?.id,
        school: school?.id,
      },
    })),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<{
  data: { grades: GetGradesQuery; users: GetUsersQuery };
}> = async (context) => {
  const id = context?.params?.school as string;
  if (!id) throw new Error("Failed to request");
  const variables = {
    where: {
      schoolId: {
        equals: Number(id),
      },
    },
  };

  const { data: grades, error: gradesError } = await client.query({
    query: GetGradesDocument,
    variables,
    fetchPolicy: "network-only",
  });

  const { data: users, error: usersError } = await client.query({
    query: GetUsersDocument,
    variables,
    fetchPolicy: "network-only",
  });

  if (!grades || gradesError || !users || usersError)
    throw new Error("Failed to request");
  return {
    props: {
      data: {
        grades,
        users,
      },
    },
    revalidate: 60,
  };
};

export default function Dashboard({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  // const { grades, users } = data;
  const router = useRouter();
  const { school } = router.query;
  const [createGrade, createdData] = useMutation(CreateGradeDocument);
  const [modalState, setModalState] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState<number>();
  const [gradeModalState, setGradeModalState] = useState(false);

  const [invitationInputState, setInvitationInputState] = useState({
    emails: "",
  });
  const [gradeInputState, setGradeInputState] = useState({
    grade: "",
  });
  const [invitations, setInvitations] = useState<invitationStatus>({});
  const invitationsArray = Object.entries(invitations).map(
    ([email, status]) => [email, status]
  );
  const sendInvitations = async () => {
    const emails = invitationInputState.emails
      .split(",")
      .map((email) => email.trim());
    emails.forEach(async (email) => {
      const isValid = regexEmail.test(email);
      if (!isValid || invitations[email] === "Enviada" || !selectedGrade)
        return;
      let status: statusType = "Pendiente";
      Object.assign(invitations, { [email]: status });
      setInvitations({ ...invitations });
      console.log(status);
      try {
        const { data } = await api.post("/auth/sendInvitation", {
          email: email,
          gradeId: selectedGrade,
          schoolId: Number(school),
          role: "STUDENT",
        });
        status = "Enviada";
      } catch (error) {
        status = "Fallida";
      }
      Object.assign(invitations, { [email]: status });
      setInvitations({ ...invitations });
    });
  };

  const addGrade = () => {
    if (!gradeInputState.grade) return;
    try {
      toast.promise(
        createGrade({
          variables: {
            createGradeInput: {
              name: gradeInputState.grade,
              School: {
                connect: {
                  id: Number(school),
                },
              },
            },
          },
        }),
        {
          loading: "Creando nuevo curso",
          error: "La creación del curso ha fallado",
          success: "!Curso creado correctamente!",
        }
      );
    } catch (error) {
      console.error(error);
    }
    setGradeModalState(false);
  };

  return (
    <Layout title="Dashboard">
      {data?.grades?.grades?.map(({ name, id }) => {
        return (
          <Table
            key={name + "-table"}
            head={{
              keys: [
                { name: "Nombre", key: "name" },
                { name: "Correo", key: "email" },
              ],
              title: name,
              icons: (
                <>
                  <EditButton
                    value={name}
                    onUpdate={(name) =>
                      updateGrade(Number(id), name, Number(school))
                    }
                    editMode={true}
                    label="curso"
                  />
                  <FontAwesomeIcon
                    icon={faPlus}
                    size="lg"
                    key={"add-4°MedioA-icon"}
                    onClick={(data) => {
                      setModalState(true);
                      setSelectedGrade(Number(id));
                    }}
                  />
                </>
              ),
            }}
            data={data?.users?.users
              ?.filter(({ gradeId }) => gradeId === Number(id))
              ?.map(({ username, email }) => [username, email])}
          />
        );
      })}
      <Modal
        title="Invitar estudiantes"
        modalState={modalState}
        setModalState={setModalState}
      >
        <StandardInput
          name="Correos"
          dataKey="emails"
          placeholder="felipe@gmail.com, juan@gmail.com..."
        />
        <Button onClick={() => sendInvitations()} style="small-active">
          Invitar
        </Button>
        {!!invitationsArray.length && (
          <Table
            head={{
              keys: [
                { name: "Correo", key: "email" },
                { name: "Estado", key: "status" },
              ],
            }}
            data={invitationsArray}
          />
        )}
      </Modal>
      <Button onClick={() => setGradeModalState(true)}>Agregar curso</Button>
      <Modal
        modalState={gradeModalState}
        setModalState={setGradeModalState}
        title="Agregar curso"
      >
        <StandardInput
          name="Curso"
          dataKey="grade"
          placeholder="4° Medio A..."
        />
        <Button style={"small-active"} onClick={addGrade}>
          Agregar
        </Button>
      </Modal>
    </Layout>
  );
}
