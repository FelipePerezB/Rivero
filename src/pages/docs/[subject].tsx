import Layout from "src/layout/Layout";
import React, { useEffect, useState } from "react";
import styles from "@styles/Docs.module.css";
import {
  IconDefinition,
  faChevronUp,
  faGear,
  faPlus,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
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
    topics: [
      {
        id: "1",
        name: "Álgebra",
        Doc: [
          {
            id: 1,
            title: "Productos notables",
          },
          {
            id: 2,
            title: "Sistema de ecuaciones",
          },
          {
            id: 3,
            title: "Función cuadratica",
          },
          {
            id: 4,
            title: "Proporcionalidad",
          },
          {
            id: 5,
            title: "Inecuaciones",
          },
        ],
      },
      {
        id: "2",
        name: "Geometría",
        Doc: [
          {
            id: 1,
            title: "Cuerpos geometricos",
          },
          {
            id: 2,
            title: "Figuras geoemtricas",
          },
          {
            id: 3,
            title: "Área y perímetro",
          },
          {
            id: 4,
            title: "Volumen",
          },
          {
            id: 5,
            title: "Teorema de pitagoras",
          },
        ],
      },
    ],
  };
  const router = useRouter();
  const [download, setDownload] = useState<number | undefined>();
  const [state, setState] = useState(true);
  const [modalState, setModalState] = useState(false);
  const { subject } = router.query;
  const subjectData = subjects.find((sub) => sub.name === subject);
  // const defaultConfig = {
  //   grade: "4° MEDIO",
  //   subject: "Matemáticas",
  // };

  // console.log(topics);

  return (
    <>
      <Layout>
        <section className={styles.info}>
          <h2 className={styles.grade}>{"4° MEDIO"}</h2>
          <div className={styles.info__buttons}>
            <span
              style={{ background: subjectData?.color }}
              className={styles.subject}
            >
              {subject}
            </span>
            <button
              className={styles.config}
              onClick={() => setModalState(true)}
            >
              <FontAwesomeIcon
                className={styles["config__icon"]}
                size="lg"
                icon={faGear}
              />
            </button>
            <Modal
              title="Configuración"
              setModalState={setModalState}
              modalState={modalState}
              options={[
                {
                  type: "boolean",
                  text: "Resumenes",
                  setState,
                  state,
                },
                {
                  text: "Ejercicios",
                  setState,
                  state,
                  type: "boolean",
                },
                {
                  text: "Ensayos",
                  setState,
                  state,
                  type: "boolean",
                },
                {
                  type: "select",
                  text: "Curso",
                },
                {
                  type: "select",
                  text: "Asignatura",
                  selectConfig: subjects?.map(
                    ({ name }: { name: string }) => name
                  ),
                },
              ]}
            />
          </div>
        </section>
        <ul className={styles.units}>
          {topics &&
            topics.map(({ name, Doc }, i) => (
              <div key={name + i}>
                {!!Doc?.length && (
                  <Unit
                    color={subjectData?.color as string}
                    setDownload={setDownload}
                    router={router}
                    text={name}
                    icon={faCircle}
                    docs={Doc as any}
                  />
                )}
              </div>
            ))}
        </ul>
        <ConfigButton
          modalOptions={[
            {
              type: "select",
              text: "Eje",
              selectConfig: topics.map(({ name }: { name: string }) => name),
            },
            {
              type: "text",
              text: "Nombre",
            },
          ]}
          callback={({ Eje, Nombre }) => {
            const topic = topics.find(({ name }) => name === Eje);
            const url = `docs/edit/N?topic=${topic?.name}&title=${Nombre}`;
            router.push(url);
          }}
          icon={faPlus}
        />
      </Layout>
      {/* {typeof download === "number" && <GetPDF id={download} />} */}
    </>
  );
}

function Unit({
  router,
  setDownload,
  text,
  color,
  docs,
}: {
  color: string;
  setDownload: React.Dispatch<React.SetStateAction<number | undefined>>;
  router: NextRouter;
  text: string;
  icon: IconDefinition;
  docs: { title: string; id: number }[];
}) {
  const [state, setState] = useState(false);
  const changeVisibility = () => setState(!state);
  return (
    <li
      key={text}
      className={styles.unit}
      style={{
        height: state ? `${(docs.length + 1) * 58 + 26}px` : "64px",
      }}
    >
      <div className={styles["unit__card"]} onClick={changeVisibility}>
        <div className={styles["card__info"]}>
          <div
            style={{
              border: `4px solid ${color}`,
            }}
            className={styles.circle}
          ></div>
          <span>{text}</span>
        </div>
        <FontAwesomeIcon
          style={{
            transition: "0.3s ease-in",
          }}
          className={styles["unit-card__chevron"]}
          rotation={state ? 180 : 90}
          icon={faChevronUp}
        />
      </div>
      <ul className={styles.docs}>
        {docs?.map(({ title, id }, i) => {
          return (
            <li key={title + id} className={styles.doc}>
              <Link href={`view/${id}`}>
                <span>{title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </li>
  );
}
