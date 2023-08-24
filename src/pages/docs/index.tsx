/* eslint-disable react-hooks/exhaustive-deps */
import Layout from "src/layout/Layout";
import React, { useEffect, useState } from "react";
import styles from "@styles/Docs.module.css";
import { NavigateCard } from "@components/Card";
import Recomendations from "@components/Recomendations";
import Link from "next/link";
import DocCard from "@components/DocCard";
import { CompletedProgress } from "@components/ProgressVar";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { client } from "src/service/client";
import { GetSubjectsDocument, GetSubjectsQuery } from "src/gql/graphql";
import { capFirst } from "src/utils/capFirst";

export const getStaticProps: GetStaticProps<{
  data: GetSubjectsQuery;
}> = async () => {
  const { data, error } = await client.query({
    query: GetSubjectsDocument,
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
  data: { subjects },
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [savedDocs, setSavedDocs] = useState<any[]>([]);
  const [stats, setStats] = useState({} as any);

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
        const isSaved = savedDocs
          .map((doc) => doc.options.id)
          .includes(newDoc.options.id);
        if (isSaved) return;
        savedDocs.push(newDoc);
        setSavedDocs([...savedDocs]);
      }
    }
  }, []);

  useEffect(() => {
    const strStats = localStorage.getItem("subjects-stats");
    if (!strStats) return;
    setStats(JSON.parse(strStats));
  }, []);

  const getProgress = (stats: any, count: number): number => {
    if (!stats) return 0;
    let completedDocs = 0;
    for (const topic in stats) {
      const docs = stats[topic] as string[];
      completedDocs += docs.length;
    }
    const progress =
      completedDocs > 0
        ? Number(((100 * completedDocs) / count).toFixed(1))
        : 0;
    return progress;
  };

  return (
    <>
      <Layout>
        <h1>Asignaturas</h1>
        <ul className={styles.units}>
          {subjects.map(({ name, Topics, color, _count, id }, i) => {
            if (!(_count.Docs > 0)) return;
            const subjectStats = stats[name] as { subject: string };
            const count = _count.Docs;
            return (
              count >= 0 && (
                <div key={name + i} className={styles["card"]}>
                  <NavigateCard link={`docs/${id}`}>
                    <div className={styles.content}>
                      <section>
                        <h2>{capFirst(name)}</h2>
                        <ul className={styles.topics}>
                          {Topics?.map((topic) => (
                            <li key={topic?.name + "-key"}>{`${capFirst(
                              topic?.name
                            )}`}</li>
                          ))}
                        </ul>
                      </section>
                      <div className={styles["progress-container"]}>
                        <CompletedProgress
                          color={color}
                          progress={getProgress(subjectStats, count)}
                        />
                      </div>
                      <p className={styles.count}>{count} documentos</p>
                    </div>
                  </NavigateCard>
                </div>
              )
            );
          })}
        </ul>
        <Recomendations title="Guardados" link="/">
          {savedDocs.map((doc, i) => (
            <>
              {i !== 0 && (
                <Link
                  key={doc.options.title + "-save-doc"}
                  href={"/docs/view/" + doc.options.docId}
                >
                  <DocCard doc={doc} />
                </Link>
              )}
            </>
          ))}
        </Recomendations>
      </Layout>
    </>
  );
}
