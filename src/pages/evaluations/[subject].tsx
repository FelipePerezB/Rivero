import Card from "@components/Card";
import React from "react";
import Layout from "src/layout/Layout";
import styles from "@styles/Evaluations.module.css";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";
import NavigationCard from "@components/cards/navigationCard/NavigationCard";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import {
  GetNotesDocument,
  GetNotesQuery,
  GetSubjectsPathsDocument,
  InputMaybe,
  Types,
} from "src/gql/graphql";
import { Context } from "@apollo/client";
import { client } from "src/service/client";

export default function Evaluations({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  ChartJS.register(
    CategoryScale,
    Legend,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip
  );
  const datasets = [
    {
      grade: "4° Medio A",
      scores: [700, 750, 780, 800],
    },
    {
      grade: "3° Medio A",
      scores: [700, 700, 730, 740],
    },
    {
      grade: "2° Medio A",
      scores: [600, 670, 710, 740],
    },
  ];
  const colors = ["#58a6ff", "#7c58ff", "#ae58ff", "#ee00ab"];
  const configData = {
    labels: datasets[0].scores?.map((score, i) => `N°${i + 1}`),
    datasets: datasets?.map(({ grade, scores }, i) => {
      const index = parseInt(String(i / colors.length)) * -colors.length + i;
      const color = colors[index];
      return {
        label: grade,
        data: scores,
        pointRadius: 2.5,
        backgroundColor: color,
        borderColor: color,
        hidden: i >= 3,
      };
    }),
  } as ChartData<"line", (number | null)[], string>;
  return (
    <Layout title="Evaluaciones">
      <section
        style={{ display: "flex", flexDirection: "column", gap: "12px" }}
      >
        {data?.notes?.map(({ File }, i) => (
          <NavigationCard
            key={File?.title + "-evaluation-" + i}
            href={`/stats/${File?.id}`}
          >
            {File?.title}
          </NavigationCard>
        ))}
      </section>
      <section>
        <Card>
          <div className={styles.line}>
            <Line
              data={configData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: true,
                    position: "bottom",
                    align: "start",
                  },
                },
              }}
            />
          </div>
        </Card>
      </section>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data, error } = await client.query({
    query: GetSubjectsPathsDocument,
    fetchPolicy: "network-only",
  });
  if (!data?.subjects || error?.name) throw new Error("Failed to request");
  return {
    paths: data?.subjects?.map((subject) => ({
      params: {
        path: subject?.id,
        subject: subject?.id,
      },
    })),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<{
  data: GetNotesQuery;
}> = async (context: Context) => {
  const { subject: id } = context?.params;
  if (!id) throw new Error("Failed to request");
  const { data, error } = await client.query({
    query: GetNotesDocument,
    variables: {
      where: {
        subjectId: {
          equals: 1,
        },
        type: {
          equals: "EVALUATION" as InputMaybe<Types>,
        },
      },
    },
    fetchPolicy: "network-only",
  });
  if (!data.notes.length || error?.name) throw new Error("Failed to request");
  return {
    props: { data },
    revalidate: 60 * 60 * 24,
  };
};
