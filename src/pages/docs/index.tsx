import Layout from "src/layout/Layout";
import Recomendations from "@components/Recomendations";
import DocCard from "@components/DocCard";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { client } from "src/service/client";
import { GetSubjectsDocument, GetSubjectsQuery } from "src/gql/graphql";
import useGetLocalDocs from "src/hooks/useGetLocalDocs";
import SubjectsCards from "@components/containers/subjectsCards/SubjectsCards";
import { useEffect, useState } from "react";
import styles from "@styles/Docs.module.css";

export default function Docs({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const savedDocs = useGetLocalDocs(5);
  const [stats, setStats] = useState<{
    [subject: string]: { [topic: string]: string };
  }>({});

  useEffect(() => {
    const strStats = localStorage.getItem("subjects-stats");
    if (!strStats) return;
    setStats(JSON.parse(strStats));
  }, []);

  return (
    <Layout title="Documentos">
      <Recomendations title="Asignaturas" link="/docs/subjects">
        <SubjectsCards
          stats={stats}
          subjecsData={data}
        />
      </Recomendations>
      {/* {!!savedDocs?.length && (
        <Recomendations title="Guardados" link="/">
          {savedDocs.map(({ type, options }) => (
            <DocCard
              href={"/docs/view/" + options.docId}
              key={options.title + "-save-doc"}
              doc={{ type, options }}
            />
          ))}
        </Recomendations>
      )} */}
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
