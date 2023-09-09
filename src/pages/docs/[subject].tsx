import Layout from "src/layout/Layout";
import React, { useEffect, useState } from "react";
import styles from "@styles/Docs.module.css";
import Link from "next/link";
import { client } from "src/service/client";
import {
  GetSubjectDocument,
  GetSubjectQuery,
  GetSubjectsPathsDocument,
} from "src/gql/graphql";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Card, { NavigateCard, SimpleCard } from "@components/Card";
import Options from "@components/Options";
import { CompletedProgress } from "@components/ProgressVar";
import Button from "@components/Button";
import { capFirst } from "src/utils/capFirst";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faPlus } from "@fortawesome/free-solid-svg-icons";

export const getStaticPaths: GetStaticPaths = async () => {
  const { data, error } = await client.query({
    query: GetSubjectsPathsDocument,
    fetchPolicy: "network-only",
  });
  if (!data?.subjects || error) throw new Error("Failed to request");
  return {
    paths: data.subjects?.map((subject) => ({
      params: {
        path: subject?.id,
        subject: subject?.id,
      },
    })),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<{
  data: GetSubjectQuery;
}> = async (context) => {
  const id = context?.params?.subject as string;
  if (!id) throw new Error("Failed to request");
  const { data, error } = await client.query({
    query: GetSubjectDocument,
    variables: {
      subjectId: Number(id),
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
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const subject = data?.subject;
  const topics = subject?.Topics;
  const topicsNames = topics
    ?.filter(({ Subtopics }) => Subtopics)
    ?.map(({ name }) => capFirst(name));
  const [topicName, setTopicName] = useState(topicsNames?.at(0));
  const [stats, setStats] = useState({} as any);
  const topic = topics?.find(
    ({ name }) => name?.toLowerCase() === topicName?.toLowerCase()
  );

  const color = subject?.color;
  const docs = topic?._count.Docs ?? 0;

  useEffect(() => {
    const strStats = localStorage.getItem("subjects-stats");
    if (!strStats) return;
    setStats(JSON.parse(strStats));
  }, []);

  const getProgress = (): number => {
    const subjectStats = stats[subject?.name];
    if (!subjectStats) return 0;
    const topicStats = subjectStats[topicName as string] as
      | string[]
      | undefined;
    if (!topicStats) return 0;
    if (!docs) return 0;

    let completedDocs = topicStats.length;
    const progress =
      completedDocs > 0 ? Number(((100 * completedDocs) / docs).toFixed(1)) : 0;
    return progress;
  };

  return (
    <Layout title={capFirst(subject?.name)}>
      <NavigateCard width="100%" link={`/evaluations/${subject.id}`}>
        <div className={styles["nav-card"]}>
          <span>Evaluaciones</span>
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
      </NavigateCard>
      <Options
        options={topicsNames as string[]}
        state={topicName as string}
        color={color}
        setState={setTopicName}
      ></Options>
      {docs > 0 && stats && (
        <SimpleCard>
          <div className={styles["stats"]}>
            <CompletedProgress
              size="lg"
              color={color}
              progress={getProgress()}
            />
            <span className={styles.count}>{docs} documentos</span>
          </div>
        </SimpleCard>
      )}
      <ul className={styles.units}>
        {true &&
          topic?.Subtopics?.map(({ Docs, name }) => (
            <div key={name + "-doc"}>
              <Card head={<span>{capFirst(name)}</span>}>
                <ul className={styles.docs}>
                  {Docs &&
                    Docs.map(({ title, externalId }) => {
                      return (
                        <Link
                          key={title + externalId}
                          href={`view/${externalId}`}
                        >
                          <li className={styles.doc}>
                            <span>{title}</span>
                          </li>
                        </Link>
                      );
                    })}
                </ul>
              </Card>
            </div>
          ))}
      </ul>
      <div className={styles.buttons}>
        <Button style="small-active">Practicar</Button>
        <Button style="small">
          <span>Crear</span>
        </Button>
      </div>
    </Layout>
  );
}
