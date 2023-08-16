import React, { useEffect, useState } from "react";
import Layout from "src/layout/Layout";
import styles from "@styles/Stats.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressBook,
  faFileArrowDown,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from "chart.js";
import Modal from "@components/Modal";
import CustomModal from "@components/CustomModal";
import ConfigButton from "@components/ConfigButton";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { api } from "src/getDoc/utils/api";
// import { getToken } from "next-auth/jwt";
// import { useSession } from "next-auth/react";

// export const getStaticProps: GetStaticProps<{
//   data: any;
// }> = async () => {
//   const { data } = await api.get("scores");
//   if (!data) throw new Error("Failed to request");
//   return {
//     props: {
//       data,
//     },
//     revalidate: 60 * 60 * 24,
//   };
// };

// export default function Statistics({
//   data,
// }: InferGetStaticPropsType<typeof getStaticProps>) {
export default function Statistics() {
  const [modalState, setModalState] = useState(false);
  const [statsModalData, setStatsModalData] = useState<{
    color: string;
    scores: number[];
  }>();

  const data = {
    Matemática: {
      docs: {
        "ENSAYO N°1": {
          "1": 900,
          "2": 800,
          "3": 750,
        },
        "ENSAYO N°2": {
          "1": 850,
          "2": 870,
          "3": 810,
        },
        "ENSAYO N°3": {
          "1": 880,
          "2": 810,
          "3": 890,
        },
      },
      color: "#e86675",
    },
    Lenguaje: {
      docs: {
        "ENSAYO N°1": {
          "1": 560,
          "2": 600,
          "3": 590,
        },
        "ENSAYO N°2": {
          "1": 700,
          "2": 650,
          "3": 600,
        },
        "ENSAYO N°3": {
          "1": 750,
          "2": 700,
          "3": 690,
        },
        "ENSAYO N°4": {
          "1": 750,
          "2": 730,
          "3": 650,
        },
      },
      color: "#46d37e",
    },
  };

  // const [userId, setUserId] = useState(0);
  // const { data: session } = useSession() as unknown as {
  //   data: {
  //     user: {
  //       id?: number;
  //     };
  //   };
  // };
  // useEffect(() => {
  //   // session?.user?.id && setUserId(session.user.id);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [session?.user?.id]);

  const [statsModalState, setStatsModalState] = useState(false);
  const [num, setNum] = useState<number>(3);
  const subjects = Object.entries(data);
  const scores = subjects.map(([name, subjectData]: [string, any]) => {
    const color = subjectData.color as string;
    const docs = Object.entries(subjectData.docs).map((doc) => doc[1]);
    const doc = docs.map((doc) => Object.entries(doc as number[]));
    const userScores = [] as number[];
    const avgs = doc.map((scores) => {
      return Math.round(
        scores
          .map(([user, score]) => {
            if (Number(user) == 1) {
              userScores.push(score);
            }
            return score;
          })
          .reduce((a, b) => a + b) / scores.length
      );
    });

    // const avgs = scores.map((score) =>
    //   Math.round(score.reduce((a, b) => a + b) / score.length)
    // );
    // const avgs = sums.map(sum=> sum / sc)
    // .sort(doc)
    // const sum = Object.entries(gradeScores)[1].reduce((a, b) => a + b);
    return {
      name,
      color: color as string,
      avgGrade: avgs,
      scores: userScores,
    };
  });

  // const scores = [
  //   {
  //     name: "Matemática",
  //     color: "#E86675",
  //     scores: [900, 950, 970, 920, 820, 890, 990, 920, 720, 890],
  //     avgGrade: [600, 640, 660, 640, 660, 670, 690, 700, 650, 690, 720, 730],
  //   },
  //   {
  //     name: "Matemática 2",
  //     color: "#8c2c37",
  //     scores: [920, 720, 890, 990],
  //     avgGrade: [905, 1000, 900, 800],
  //   },
  //   {
  //     name: "Lenguaje",
  //     color: "#46D37E",
  //     scores: [920, 720, 890, 990],
  //     avgGrade: [905, 1000, 900, 800],
  //   },
  //   {
  //     name: "Ciencias",
  //     color: "#50a9e8",
  //     scores: [920, 720, 890, 990],
  //     avgGrade: [905, 1000, 900, 800],
  //   },
  // ];

  const openModal = (data: { color: string; scores: number[] }) => {
    setStatsModalState(true);
    setStatsModalData(data);
  };

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip
  );

  return (
    <Layout>
      <section className={styles.container}>
        {/* <div onClick={() => setModalState(true)} className={styles.options}>
          <button>Generar reporte</button>
          <FontAwesomeIcon icon={faFileArrowDown} />
        </div> */}
        {statsModalData?.scores && (
          <OptionsModal
            scores={statsModalData?.scores}
            color={statsModalData?.color}
            num={num}
            modalState={statsModalState}
            setModalState={setStatsModalState}
          />
        )}
        {scores &&
          scores?.map((data: any, i: number) => (
            <LineChart openModal={openModal} key={`chart-${i}`} {...data} />
          ))}
      </section>
      <ConfigButton
        icon={faFileArrowDown}
      />
    </Layout>
  );
}

function LineChart({
  scores,
  name,
  color,
  avgGrade,
  openModal,
}: {
  openModal: (data: { color: string; scores: number[] }) => void;
  scores: number[];
  name: string;
  color: string;
  avgGrade: number[];
}) {
  const configData = {
    labels: avgGrade?.map((score, i) => `N°${i + 1}`),
    datasets: [
      {
        label: "Puntaje",
        data: scores,
        borderColor: color,
        backgroundColor: color,
        pointRadius: 4,
      },
      {
        label: "Promedio curso",
        data: avgGrade,
        // borderDash: [30, 10],
        pointRadius: 2.5,
        backgroundColor: "#001251",
        borderColor: "#001251",
      },
    ],
  };

  return (
    <>
      <article>
        <div className={styles.info} key={name}>
          <h3>{name}</h3>
          <FontAwesomeIcon
            onClick={() => openModal({ color, scores })}
            style={{ background: color }}
            className={styles.info__icon}
            icon={faAddressBook}
          />
        </div>
        <div className={styles.chart}>
          <Line data={configData} options={{ responsive: true }} />
        </div>
      </article>
    </>
  );
}
const OptionsModal = ({
  modalState,
  setModalState,
  scores,
  num,
  color,
}: {
  modalState: boolean;
  setModalState: React.Dispatch<React.SetStateAction<boolean>>;
  scores: number[];
  num: number;
  color: string;
}) => {
  const spliceIndex = num <= scores.length ? num : scores.length;
  const firstScore = scores[0];
  const reverseScores = scores.reverse();
  const lastScore = reverseScores[0];
  const lastScores = reverseScores.slice(0, spliceIndex);
  const avgLastScores = Math.round(
    lastScores.reduce((a, b) => a + b) / lastScores.length
  );
  const highScore = scores.sort((a, b) => a - b)[scores.length - 1];

  const reportData = [
    { text: "Primero", value: firstScore },
    { text: "Actual", value: lastScore },
    { text: "Objetivo", value: 950 },
  ];

  const reportTexts = [
    { text: `Promedio ${spliceIndex} últimos`, value: avgLastScores },
    { text: `Ensayos totales`, value: scores.length },
    { text: `Puntaje más alto`, value: highScore },
  ];

  return (
    <Modal
      key={name + "-sumary"}
      title="Resumen"
      modalState={modalState}
      setModalState={setModalState}
    >
      <div className={styles.modal__container}>
        <ul className={styles.sumary}>
          {reportData.map(({ text, value }) => (
            <li
              key={text}
              style={{ backgroundColor: color }}
              className={styles.score}
            >
              <span>{text}</span>
              <span className={styles.number}>{value}</span>
            </li>
          ))}
        </ul>
        <ul>
          {reportTexts.map(({ text, value }) => (
            <li key={text} className={styles.sumary__texts}>
              <p>{text}</p>
              <span>{value}</span>
            </li>
          ))}
        </ul>
      </div>
    </Modal>
  );
};
