import Layout from "src/layout/Layout";
import React, { useEffect, useState } from "react";
import styles from "@styles/Docs.module.css";
import Card from "@components/Card";
import Recomendations from "@components/Recomendations";
import DocCard from "@components/DocCard";
import { CompletedProgress } from "@components/ProgressVar";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { client } from "src/service/client";
import { GetSubjectsDocument, GetSubjectsQuery } from "src/gql/graphql";
import capFirst from "src/utils/capFirst";
import useGetLocalDocs from "src/hooks/useGetLocalDocs";
import getDocsProgress from "src/utils/getDocsProgress";
import Tags from "@components/tags/Tags";
import SubjectsCards from "@components/containers/subjectsCards/SubjectsCards";

export default function Docs({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const savedDocs = useGetLocalDocs(5);

  return (
    <Layout title="Documentos">
      <Recomendations title="Asignaturas" link="/">
        <SubjectsCards subjecsData={data} />
        {/* {subjects?.map(
          ({ name, Topics, color, _count: { Docs: count }, id }) => {
            const tags = Topics?.map((topic) => topic.name);
            if (!(count > 0) || !tags?.length) return;
            const progress = getDocsProgress(name, count, stats);
            const label = `${count} documentos`;
            const key = "card-" + name;
            const href = `docs/${id}`;
            return (
              <Card key={key} href={href} className={styles.card}>
                <h2>{capFirst(name)}</h2>
                <Tags tags={tags} />
                <CompletedProgress {...{ label, progress, color }} />
              </Card>
            );
          }
        )} */}
      </Recomendations>
      <Recomendations title="Guardados" link="/">
        {savedDocs.map(({ type, options }) => (
          <DocCard
            href={"/docs/view/" + options.docId}
            key={options.title + "-save-doc"}
            doc={{ type, options }}
          />
        ))}
      </Recomendations>
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
