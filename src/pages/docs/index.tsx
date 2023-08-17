import Layout from "src/layout/Layout";
import React, { useEffect, useState } from "react";
import styles from "@styles/Docs.module.css";
import { NextRouter, useRouter } from "next/router";
import { NavigateCard } from "@components/Card";
import Recomendations from "@components/Recomendations";
import GetDoc from "src/getDoc/GetDoc";
import { pdfNodes } from "src/schemas";
import Link from "next/link";
import DocCard from "@components/DocCard";

export default function Docs() {
  const { subjects } = {
    subjects: [
      {
        name: "Mátemática",
        color: "#e86675",
        id: 2,
        progress: 60,
        topics: ["Álgebra", "Números", "Geometría", "Estadística"],
        count: 52,
      },
      {
        progress: 41,
        name: "Lenguaje",
        color: "#46d37e",
        id: 1,
        topics: ["Inferir", "Evaluar", "Localizar", "Léxico"],
        count: 16,
      },
      {
        progress: 80,
        name: "Historia",
        color: "black",
        id: 1,
        topics: [
          "Siglo IX Chile",
          "Siglo IX Mundo",
          "Primera Mitad Siglo XX",
          "Léxico",
        ],
        count: 16,
      },
    ],
  };
  const router = useRouter();
  const [download, setDownload] = useState<number | undefined>();
  const [state, setState] = useState(true);
  const [modalState, setModalState] = useState(false);
  const { subject } = { subject: "Matemática" };
  const subjectData = subjects.find((sub) => sub.name === subject);

  const [savedDocs, setSavedDocs] = useState<any[]>([]);

  useEffect(() => {
    for (let index = 0; index < localStorage.length; index++) {
      const key = localStorage.key(index);
      const doc = key?.includes("doc-") && localStorage.getItem(key);
      if (doc) {
        const jsonDoc = JSON.parse(doc);
        const newDoc = {
          ...jsonDoc,
          options: {
            ...jsonDoc.options,
            children: [jsonDoc.options.children[0]],
          },
        };
        setSavedDocs([...savedDocs, newDoc]);
      }
    }
  }, []);

  const ProgressVar = ({
    progress,
    color = "var(--primary-color)",
  }: {
    progress: number;
    color?: string;
  }) => {
    return (
      <div className={styles["progress-container"]}>
        <div
          style={{ width: `${progress}%`, background: color }}
          className={styles.progress}
        ></div>
      </div>
    );
  };
  const CompletedProgress = ({
    progress,
    color = "var(--primary-color)",
  }: {
    progress: number;
    color?: string;
  }) => {
    return (
      <span className={styles["completed-progress"]}>
        <ProgressVar color={color} progress={progress} />
        {progress}%
      </span>
    );
  };

  return (
    <>
      <Layout>
        <h1>{"Asignaturas"}</h1>
        <ul className={styles.units}>
          {subjects.map(({ name, count, topics, progress, color }, i) => (
            <NavigateCard key={name + i} link={`docs/${name}`}>
              <div className={styles.card}>
                <section>
                  <h2>{name}</h2>
                  <ul className={styles.topics}>
                    {topics &&
                      topics.map((topic) => (
                        <li key={topic + "-key"}>{topic}</li>
                      ))}
                  </ul>
                </section>
                <CompletedProgress color={color} progress={progress} />
                <p className={styles.count}>{count} documentos</p>
              </div>
            </NavigateCard>
          ))}
        </ul>
        <Recomendations title="Guardados" link="/">
          <ul className={styles.documents}>
            {savedDocs.map((doc) => (
              <Link
                key={doc.options.title + "-save-doc"}
                href={"/docs/view/" + doc.options.docId}
              >
                <DocCard doc={doc} />
              </Link>
            ))}
          </ul>
        </Recomendations>
      </Layout>
    </>
  );
}
