import Recomendations from "@components/Recomendations";
import Layout from "src/layout/Layout";
import styles from "@styles/Home.module.css";

export default function Home() {
  const stats = [
    {
      color: "#e86675",
      subject: "Matemática M1",
      number: 750,
    },
    {
      color: "#46d37e",
      subject: "Lenguaje",
      number: 800,
    },
    {
      color: "#e86675",
      subject: "Matemática",
      number: 770,
    },
  ];
  const docs = [
    { title: "Raices" },
    { title: "Productos notables" },
    { title: "Teorema de tales" },
  ];
  return (
    <>
      <Layout>
        <Recomendations title="Ultimos puntajes" link="/stats">
          <Scores scores={stats} />
        </Recomendations>
        <Recomendations title="Últimas guías" link="/docs">
          <Docs docs={docs} />
        </Recomendations>
      </Layout>
    </>
  );
}

function Scores({
  scores,
}: {
  scores: {
    color: string;
    subject: string;
    number: number;
  }[];
}) {
  return (
    <ul className={styles.stats}>
      {scores.map((score, i) => (
        <li
          style={{ background: score.color }}
          className={styles.stats__card}
          key={score.subject + i}
        >
          <span className={styles.subject}>{score.subject}</span>
          <span className={styles.score}>{score.number}</span>
        </li>
      ))}
    </ul>
  );
}

function Docs({ docs }: { docs: { title: string }[] }) {
  return (
    <ul className={styles.documents}>
      {docs.map((doc) => (
        <li key={doc.title} className={styles["documents__card"]}>
          <div></div>
          <span>{doc.title}</span>
        </li>
      ))}
    </ul>
  );
}
