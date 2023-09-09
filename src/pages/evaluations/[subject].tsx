import { SimpleCard } from "@components/Card";
import { faChartSimple, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
import Link from "next/link";

export default function Evaluations() {
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
        <SimpleCard>
          <article className={styles.header}>
            <h2 className={styles["evaluation__title"]}>Ensayo M1 N°2726</h2>
            <div>
              <Link href={"/check/1"}>
                <FontAwesomeIcon
                  className={styles["main-icon"]}
                  icon={faPlus}
                />
              </Link>
              <FontAwesomeIcon icon={faChartSimple} />
            </div>
          </article>
        </SimpleCard>
      </section>
      <section>
        <SimpleCard>
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
        </SimpleCard>
      </section>
    </Layout>
  );
}
