import Layout from "src/layout/Layout";
import React, { useEffect, useState } from "react";
import styles from "@styles/Docs.module.css";
import {
  IconDefinition,
  faChevronUp,
  faGear,
  faPlus,
  faCircle,
  faCircleCheck,
  faCircleDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Modal from "@components/Modal";
import ConfigButton from "@components/ConfigButton";
import { NextRouter, Router, useRouter } from "next/router";
import { api } from "src/getDoc/utils/api";
import GetPDF from "src/getDoc/getPDF";
import { client } from "src/service/client";
import { gql, useQuery } from "@apollo/client";
import { GetBasicDataDocument, GetBasicDataQuery } from "src/gql/graphql";
import { GetStaticProps, InferGetStaticPropsType } from "next";
// import { GetGradesDocument } from "src/gql/graphql";

export const getStaticProps: GetStaticProps<{
  data: GetBasicDataQuery;
}> = async () => {
  const { data, error } = await client.query({
    query: GetBasicDataDocument,
    variables: {
      where: {
        subjectId: {
          equals: 1,
        },
      },
      subjectsWhere2: {},
    },
    fetchPolicy: "network-only",
  });

  if (!data || error) throw new Error("Failed to request");
  return {
    props: {
      data,
    },
    revalidate: 60 * 60 * 24,
  };
};

export default function Docs({
  data: { subjects, topics },
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  const [download, setDownload] = useState<number | undefined>();
  const [state, setState] = useState(true);
  const [modalState, setModalState] = useState(false);
  const defaultConfig = {
    grade: "4° MEDIO",
    subject: "Matemáticas",
  };

  // console.log(topics);

  return (
    <>
      <Layout>
        <section className={styles.info}>
          <h2 className={styles.grade}>{defaultConfig.grade}</h2>
          <div className={styles.info__buttons}>
            <span className={styles.subject}>{defaultConfig.subject}</span>
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
            topics.map(({ name, Doc }) => (
              <>
                {!!Doc?.length && (
                  <Unit
                    setDownload={setDownload}
                    router={router}
                    text={name}
                    key={name}
                    icon={faCircle}
                    docs={Doc as any}
                  />
                )}
              </>
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
      {typeof download === "number" && <GetPDF id={download} />}
    </>
  );
}

function Unit({
  router,
  setDownload,
  text,
  docs,
}: {
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
              border: `4px solid ${"#E86675"}`,
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
              <Link href={`docs/${id}`}>
                <span>{title}</span>
              </Link>
              <div className={styles.options}>
                <FontAwesomeIcon
                  onClick={() => {
                    router.push(`docs/check/${id}`);
                  }}
                  className={styles.icon}
                  icon={faCircleCheck}
                />
                {/* <FontAwesomeIcon
                  className={styles.icon}
                  icon={faCircleDown}
                  onClick={() => setDownload(Number(id))}
                /> */}
              </div>
            </li>
          );
        })}
      </ul>
    </li>
  );
}
