import Card from "@components/Card";
import { faChevronRight, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Layout from "src/layout/Layout";
import styles from "@styles/DashboardSubjects.module.css";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { GetSubjectsDocument, GetSubjectsQuery } from "src/gql/graphql";
import { client } from "src/service/client";
import capFirst from "src/utils/capFirst";

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

export default function Subjects({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout title="Asignaturas">
      {data?.subjects?.map((subject) => (
        <Card key={`card-${subject.id}`} className={styles.card} href="/">
          <h3>{capFirst(subject.name)}</h3>
          <div className={styles.icons}>
            <FontAwesomeIcon onClick={() => console.log("AA")} icon={faPen} />
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
        </Card>
      ))}
    </Layout>
  );
}
