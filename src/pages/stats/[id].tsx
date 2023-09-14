import Button from "@components/Button";
import Card from "@components/Card";
import Options from "@components/Options";
import Table from "@components/Table";
import React, { useState } from "react";
import Layout from "src/layout/Layout";
import styles from "@styles/Stats.module.css";
import { useRouter } from "next/router";

const StatsCard = ({ title, value }: { title: string; value: string }) => (
  <article className={styles["sumarize__item"]}>
    <h3>{title}</h3>
    <span>{value}</span>
  </article>
);

export default function Stats() {
  const router = useRouter();
  const { id } = router.query;
  const options = ["4° Medio A", "3° Medio A", "2° Medio A", "1° Medio A"];
  const [option, setOption] = useState(options[0]);
  return (
    <Layout title="Estadísticas">
      <Card className={styles["sumarize"]}>
        <StatsCard title="Mayor" value="700" />
        <StatsCard title="Promedio" value="650" />
        <StatsCard title="Total" value="42" />
      </Card>
      <Options {...{ option, setOption, options }} />
      {/* <Table
        onClick={(student) => router.push(`/check/${id}?student=${student}`)}
        data={{
          Estudiantes: [
            "Felipe Pérez Belmar",
            "Lorem, ipsum dolor",
            "Lorem, ipsum dolor",
            "Felipe Pérez Belmar",
            "Lorem, ipsum dolor",
            "Lorem, ipsum dolor",
            "Felipe Pérez Belmar",
            "Lorem, ipsum dolor",
            "Lorem, ipsum dolor",
            "Felipe Pérez Belmar",
            "Lorem, ipsum dolor",
            "Lorem, ipsum dolor",
            "Felipe Pérez Belmar",
            "Lorem, ipsum dolor",
            "Lorem, ipsum dolor",
          ],
          Puntajes: [
            750, 800, 900, 750, 800, 900, 750, 800, 900, 900, 750, 800, 900,
            750, 800, 900,
          ],
        }}
      /> */}
      <Button>Generar reporte</Button>
    </Layout>
  );
}
