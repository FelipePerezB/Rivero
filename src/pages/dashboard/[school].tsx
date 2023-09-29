import React, { useState } from "react";
import Layout from "src/layout/Layout";
import Button from "@components/Button";
import Table from "@components/Table";
import Modal from "@components/modals/modal/Modal";
import StandardInput from "@components/inputs/StandardInput/StandardInput";
import { useMutation } from "@apollo/client";
import {
  CreateGroupDocument,
  GetGroupsDocument,
  GetGroupsQuery,
  GetUserDocument,
  GetUsersDocument,
  GetUsersQuery,
  Role,
} from "src/gql/graphql";
import toast from "react-hot-toast";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { client } from "src/service/client";
import EditButton from "@components/button/editButton/EditButton";
import updateGroup from "src/service/querys/grade/updateGrade";
import { useRouter } from "next/router";
import removeGroup from "src/service/querys/grade/removeGrade";
import { getAuth } from "@clerk/nextjs/server";
import InvitationBtns from "@components/button/invitationsBtns/InvitationBtns";

export const getServerSideProps = (async (context) => {
  const redirect = {
    redirect: { destination: "/docs", permanent: false },
  };

  const { userId } = getAuth(context.req);
  const { school } = context.query;

  if (!userId) return redirect;
  const {
    data: {
      user: { role, organizationId },
    },
    error,
  } = await client.query({
    query: GetUserDocument,
    variables: {
      where: {
        
        externalId: userId,
      },
    },
    fetchPolicy: "network-only",
  });
  console.log(userId);


  if (!role || error) return redirect;
  if (!(role === Role.Admin || role === Role.Director)) return redirect;
  if (role === Role.Director && Number(school) !== organizationId)
    return {
      redirect: {
        destination: `/dashboard/${organizationId}`,
        permanent: false,
      },
    };

  const variables = {
    where: {
      organizationId: {
        equals: Number(school),
      },
    },
  };
  const {
    data: { groups },
    error: groupsError,
  } = await client.query({
    query: GetGroupsDocument,
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

  if (!groups || groupsError || !users || usersError) return redirect;
  return { props: { data: { users, groups } } };
}) satisfies GetServerSideProps<{
  data: { users: GetUsersQuery["users"]; groups: GetGroupsQuery["groups"] };
}>;

export default function Dashboard({
  data: { users, groups },
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const { school } = router.query;
  const [createGroup] = useMutation(CreateGroupDocument);
  const [gradeModalState, setGroupModalState] = useState(false);
  const [gradeInputState, setGroupInputState] = useState({
    grade: "",
  });

  const addGroup = () => {
    if (!gradeInputState.grade) return;
    try {
      toast.promise(
        createGroup({
          variables: {
            createGroupInput: {
              name: gradeInputState.grade,
              Organization: {
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
    setGroupModalState(false);
  };

  return (
    <Layout title="Dashboard">
      {groups?.map(({ name, id }) => {
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
                      updateGroup(Number(id), name, Number(school))
                    }
                    onRemove={() => removeGroup(Number(id))}
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
            // data={users
            //   ?.filter(({ gradeId }) => gradeId === Number(id))
            //   ?.map(({ username, email }) => [username, email])}
          />
        );
      })}
      <Button onClick={() => setGroupModalState(true)}>Agregar curso</Button>
      <Modal
        modalState={gradeModalState}
        setModalState={setGroupModalState}
        title="Agregar curso"
      >
        <StandardInput
          name="Curso"
          dataKey="grade"
          placeholder="4° Medio A..."
        />
        <Button onClick={addGroup}>Agregar</Button>
      </Modal>
    </Layout>
  );
}
