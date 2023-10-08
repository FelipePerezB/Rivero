import React, { useEffect, useState } from "react";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { client } from "src/service/client";
import {
  CreateSubjectDocument,
  GetSubjectsDocument,
  GetSubjectsQuery,
} from "src/gql/graphql";
import SubjectsCards from "@components/containers/subjectsCards/SubjectsCards";
import Layout from "src/layout/Layout";
import Button, { ButtonAttrs } from "@components/Button";
import { useMutation } from "@apollo/client";
import Form from "@components/forms/simpleForm/SimpleForm";
import Modal from "@components/modals/modal/Modal";
import { StandartInputAttrs } from "src/models/StandartInputAttr";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";
import Buttons from "@components/button/buttons/Buttons";

export default function Subjects({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { user } = useUser();
  const role = user?.publicMetadata.role as string | undefined;
  const [createSubject] = useMutation(CreateSubjectDocument);
  const [modalState, setModalState] = useState(false);
  const [stats, setStats] = useState<{
    [subject: string]: { [topic: string]: string };
  }>({});

  useEffect(() => {
    const strStats = localStorage.getItem("subjects-stats");
    if (!strStats) return;
    setStats(JSON.parse(strStats));
  }, []);


  const query = async ({
    name,
    color = "#0c0e13",
  }: {
    name: string;
    color: string;
  }) => {
    const variables = {
      createSubjectInput: {
        color,
        name,
      },
    };
    toast.promise(createSubject({ variables }), {
      loading: `Creando asignatura "${name}"...`,
      success: `¡Asignatura "${name}" creado correctamente!`,
      error: `No se ha logrado crear la asignatura ${name}`,
    });
  };

  const [editMode, setEditMode] = useState(false);

  const formData = [
    {
      title: "AA",
      buttons: [
        { children: "Crear", onClick: query },
      ] as ButtonAttrs[],
      inputs: [
        { name: "Nombre", dataKey: "name" },
        { type: "color", name: "color" },
      ] as StandartInputAttrs[],
    },
  ];

  return (
    <Layout title="Asignaturas">
      {/* <SubjectsCards editMode={editMode} subjecsData={data} stats={stats} /> */}
      {role === "ADMIN" && (
        <>
          <Buttons>
            <Button onClick={() => setModalState(true)}>
              Crear asignatura
            </Button>
            <Button
            color="white"
              onClick={() => {
                setEditMode(!editMode);
                setModalState(false);
              }}
            >
              {!editMode ? "Editar asignaturas" : "Deshabilitar edición"}
            </Button>
          </Buttons>
          <Modal title="Crear asignatura" {...{ modalState, setModalState }}>
            <Form data={formData} />
          </Modal>
        </>
      )}
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<{
  data: GetSubjectsQuery;
}> = async () => {
  const { data, error } = await client.query({
    query: GetSubjectsDocument,
    fetchPolicy: "network-only",
  });
  if (!data || error) throw new Error("Failed to request");
  return {
    props: { data },
    revalidate: 60 * 60 * 24,
  };
};
