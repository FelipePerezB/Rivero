import React, { useEffect, useState } from "react";
import styles from "@styles/Edit.module.css";
import Layout from "src/layout/Layout";
import GetDoc from "src/getDoc/GetDoc";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faFloppyDisk, faPlus } from "@fortawesome/free-solid-svg-icons";
import ConfigButton from "@components/ConfigButton";
import { useRouter } from "next/router";
import { pdfNodes } from "src/schemas";

type props = { type: string; options: any };

const docs = [
  { title: "Raices" },
  { title: "Productos" },
  { title: "Teorema de tales" },
  { title: "Papomudas" },
  { title: "Multiplicaciones" },
  { title: "Potencias" },
];

const data = {
  id: "7",
  name: "Sistema de ecuaciones",
  subtitle: "AAAAA",
  component: {
    type: "doc",
    options: {
      id: "CID812919622",
      childrens: [
        {
          type: "page",
          options: {
            id: "CID812819282",
            childrens: [
              {
                type: "docInfo",
                options: {
                  id: "CID812889282",
                  title: "SISTEMA DE ECUACIONES",
                  subtitle: "EJE: ALGEBRA",
                },
              },
            ],
          },
        },
      ],
    },
  },
};

export default function EditPage() {
  const [filteredDocs, setFilteredDocs] = useState(docs);

  const router = useRouter();
  const [subjects, setSubjects] = useState([
    {
      name: "Matemática",
    },
  ]);
  const [grades, setGrades] = useState([{ grade: "4° Medio" }]);
  const [topics, setTopics] = useState<any[]>([{ name: "Geometria" }]);
  const useEditDoc = async ({
    Curso,
    Nombre,
    Asignatura,
    Eje,
  }: {
    Curso: string;
    Asignatura: string;
    Nombre: string;
    Eje: string;
  }) => {
    const grade = grades.find(({ grade }) => grade === Curso) as any;
    const topic = topics.find(({ name }) => name === Eje);
    const subject = subjects.find(({ name }) => name === Asignatura) as any;

    router.push(
      `docs/edit/N?${grade?.grade}=${grade.id}&${topic.name}=${topic.id}&${subject.name}=${subject.id}&${Nombre}`
    );
  };
  return (
    <Layout>
      <label className={styles["search-container"]}>
        <input
          onChange={({ target }) => {
            setFilteredDocs(
              docs.filter(({ title }) =>
                title.toUpperCase().includes(target.value.toUpperCase())
              )
            );
          }}
          className={styles.search}
          placeholder="Búsqueda..."
        />
      </label>
      <Docs docs={filteredDocs} />
    </Layout>
  );
}

function Docs({ docs }: { docs: { title: string }[] }) {
  return (
    <ul className={styles.documents}>
      {docs.map((doc) => (
        <li key={doc.title} className={styles["documents__card"]}>
          <div className={styles.content}>
            <GetDoc nodes={pdfNodes} {...data} />
          </div>
          <div className={styles.info}>
            <span className={styles.info__text}>{doc.title}</span>
            <FontAwesomeIcon className={styles.icon} icon={faBookmark} />
          </div>
        </li>
      ))}
    </ul>
  );
}
