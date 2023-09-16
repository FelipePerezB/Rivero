import React, { useState } from "react";
import Layout from "src/layout/Layout";
import Button from "@components/Button";
import Table from "@components/Table";
import Modal from "@components/modals/modal/Modal";
import StandardInput from "@components/inputs/StandardInput/StandardInput";
import { useMutation } from "@apollo/client";
import {
  CreateGradeDocument,
  GetGradesDocument,
  GetGradesQuery,
  GetUserDocument,
  GetUsersDocument,
  GetUsersQuery,
  Role,
} from "src/gql/graphql";
import toast from "react-hot-toast";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { client } from "src/service/client";
import EditButton from "@components/button/editButton/EditButton";
import updateGrade from "src/service/querys/grade/updateGrade";
import { useRouter } from "next/router";
import removeGrade from "src/service/querys/grade/removeGrade";
import { getAuth } from "@clerk/nextjs/server";
import InvitationBtns from "@components/invitationsBtns/InvitationBtns";

export const getServerSideProps = (async (context) => {
  const redirect = {
    redirect: { destination: "/docs", permanent: false },
  };

  const { userId } = getAuth(context.req);
  const { school } = context.query;
  if (!userId) return redirect;
  const {
    data: {
      user: { role, schoolId },
    },
    error,
  } = await client.query({
    query: GetUserDocument,
    variables: {
      where: {
        externalId: userId,
      },
    },
    fetchPolicy: "network-only"
  });

  if (!role || error) return redirect;
  if (!(role === Role.Admin || role === Role.Director)) return redirect;
  if (role === Role.Director && Number(school) !== schoolId)
    return {
      redirect: {
        destination: `/dashboard/${schoolId}`,
        permanent: false,
      },
    };

  const variables = {
    where: {
      schoolId: {
        equals: Number(school),
      },
    },
  };
  const {
    data: { grades },
    error: gradesError,
  } = await client.query({
    query: GetGradesDocument,
    variables,
    fetchPolicy: "network-only",
  });

  const {
    data: { users },
    error: usersError,
  } = await client.query({
    query: GetUsersDocument,
    variables,
    fetchPolicy: "network-only",
  });

  if (!grades || gradesError || !users || usersError) return redirect;
  return { props: { data: { users, grades } } };
}) satisfies GetServerSideProps<{
  data: { users: GetUsersQuery["users"]; grades: GetGradesQuery["grades"] };
}>;

export default function Dashboard({
  data: { users, grades },
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const { school } = router.query;
  const [createGrade] = useMutation(CreateGradeDocument);
  const [gradeModalState, setGradeModalState] = useState(false);
  const [gradeInputState, setGradeInputState] = useState({
    grade: "",
  });

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
      {grades?.map(({ name, id }) => {
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
                    isPublic={true}
                    value={name}
                    onUpdate={(name) =>
                      updateGrade(Number(id), name, Number(school))
                    }
                    onRemove={() => removeGrade(Number(id))}
                    editMode={true}
                    label="curso"
                  />
                  <InvitationBtns
                    gradeId={Number(id)}
                    role={Role.Student}
                    schoolId={Number(school)}
                  />
                </>
              ),
            }}
            data={users
              ?.filter(({ gradeId }) => gradeId === Number(id))
              ?.map(({ username, email }) => [username, email])}
          />
        );
      })}
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
        <Button onClick={addGrade}>
          Agregar
        </Button>
      </Modal>
    </Layout>
  );
}
