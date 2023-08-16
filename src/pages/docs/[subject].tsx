import Layout from "src/layout/Layout";
import React, { use, useEffect, useState } from "react";
import styles from "@styles/Docs.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Modal from "@components/Modal";
import ConfigButton from "@components/ConfigButton";
import { NextRouter, useRouter } from "next/router";
import { client } from "src/service/client";
import {
  GetBasicDataDocument,
  GetBasicDataQuery,
  GetSubjectsDocument,
} from "src/gql/graphql";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Card from "@components/Card";
import Options from "@components/Options";
import Recomendations from "@components/Recomendations";
import GetDoc from "src/getDoc/GetDoc";
import { pdfNodes } from "src/schemas";
// import { GetGradesDocument } from "src/gql/graphql";

// export const getStaticPaths: GetStaticPaths = async () => {
//   const { data, error } = await client.query({
//     query: GetSubjectsDocument,
//     variables: {
//       where: {},
//     },
//     fetchPolicy: "network-only",
//   });
//   if (!data || error) throw new Error("Failed to request");
//   return {
//     paths: data.subjects.map((subject) => ({
//       params: {
//         path: subject.name,
//         subject: subject.name,
//       },
//     })),
//     fallback: true,
//   };
// };

// export const getStaticProps: GetStaticProps<{
//   data: GetBasicDataQuery;
// }> = async (context) => {
//   const { data, error } = await client.query({
//     query: GetBasicDataDocument,
//     variables: {
//       where: {
//         subjectId: {
//           equals: 1,
//         },
//       },
//       subjectsWhere2: {
//         name: {
//           equals: context?.params?.subject as string,
//         },
//       },
//     },
//     fetchPolicy: "network-only",
//   });

//   if (!data || error) throw new Error("Failed to request");
//   return {
//     props: {
//       data,
//     },
//     revalidate: 60 * 60 * 24,
//   };
// };

// export default function Docs({
//   data: { subjects, topics },
// }: InferGetStaticPropsType<typeof getStaticProps>) {
export default function Docs() {
  const { subjects, topics } = {
    topics: [
      {
        id: "1",
        name: "Álgebra",
        subtopics: [
          {
            id: 1,
            title: "Funciones",
            docs: [
              {
                id: 1,
                title: "Concepto de función",
              },
              {
                id: 2,
                title: "Función Cuadrática",
              },
              {
                id: 3,
                title: "Modelos lineales",
              },
              {
                id: 4,
                title: "Traslación de funciones",
              },
            ],
          },
          {
            id: 2,
            title: "Polinomios",
            docs: [
              {
                id: 1,
                title: "Productos notables",
              },
              {
                id: 2,
                title: "Factorización",
              },
              {
                id: 3,
                title: "¿Qué son los polinomios?",
              },
            ],
          },
          {
            id: 2,
            title: "Ecuaciones",
            docs: [
              {
                id: 1,
                title: "Concepto de ecuación",
              },
              {
                id: 2,
                title: "Proporcionalidad",
              },
              {
                id: 3,
                title: "Inecuaciones",
              },
            ],
          },
        ],
      },
      {
        id: "2",
        name: "Geometría",
        subtopics: [
          {
            id: 1,
            title: "Figuras geometricas",
            docs: [
              {
                id: 1,
                title: "Área y perímetro",
              },
              {
                id: 2,
                title: "Triángulos",
              },
              {
                id: 2,
                title: "Circulos",
              },
            ],
          },
          {
            id: 2,
            title: "Cuerpos geometrícos",
            docs: [
              {
                id: 1,
                title: "Cuerpos rectos",
              },
              {
                id: 2,
                title: "Cuerpos redondos",
              },
            ],
          },
        ],
      },
      {
        id: "3",
        name: "Estadística",
        subtopics: [
          {
            id: 1,
            title: "Representar datos",
            docs: [
              {
                id: 1,
                title: "Tablas de frecuencia",
              },
              {
                id: 2,
                title: "Gráficos",
              },
            ],
          },
          {
            id: 2,
            title: "Medidas",
            docs: [
              {
                id: 1,
                title: "Cuartiles",
              },
              {
                id: 2,
                title: "Posición",
              },
              {
                id: 3,
                title: "Tendencia central",
              },
            ],
          },
          {
            id: 2,
            title: "Probabilidad",
            docs: [
              {
                id: 1,
                title: "Probabilidad compuesta",
              },
              {
                id: 2,
                title: "Probabilidad clasica",
              },
            ],
          },
        ],
      },
    ],
    subjects: [
      {
        name: "matemática",
        color: "#e86675",
        id: 2,
      },
      {
        name: "lenguaje",
        color: "#46d37e",
        id: 1,
      },
    ],
  };

  const router = useRouter();
  const [download, setDownload] = useState<number | undefined>();
  const [state, setState] = useState(true);
  const [modalState, setModalState] = useState(false);
  const { subject } = router.query as {
    subject: string;
  };
  const [topic, setTopic] = useState("Álgebra");
  const subjectData = subjects.find((sub) => sub.name === subject);

  return (
    <>
      <Layout>
        <Link href={"/docs"}>
          <h1 className={styles.grade}>{subject}</h1>
        </Link>
        <Options
          options={["Álgebra", "Geometría", "Estadística"]}
          state={topic}
          setState={setTopic}
        ></Options>
        <ul className={styles.units}>
          {topics &&
            topics.map(({ name, subtopics }, i) => {
              if (name !== topic) return;
              return subtopics.map(({ docs, title }) => (
                <div key={name + "-doc"}>
                  <Card head={<span>{title}</span>}>
                    <ul className={styles.docs}>
                      {docs &&
                        docs.map(({ title, id }) => {
                          return (
                            <Link key={title + id} href={`view/${id}`}>
                              <li className={styles.doc}>
                                <span>{title}</span>
                              </li>
                            </Link>
                          );
                        })}
                    </ul>
                  </Card>
                </div>
              ));
            })}
        </ul>
      </Layout>
    </>
  );
}