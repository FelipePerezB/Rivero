import Card from "@components/Card";
import StandardInput from "@components/inputs/StandardInput/StandardInput";
import React from "react";
import Layout from "src/layout/Layout";
import styles from "@styles/Check.module.css";
import OptionsInput from "@components/inputs/OptionsInput/OptionsInput";
import Button from "@components/Button";
import { useRouter } from "next/router";

export default function Check() {
  const router = useRouter();
  const options = [
    "A",
    "B",
    "C",
    "C",
    "B",
    "A",
    "A",
    "B",
    "C",
    "D",
    "E",
    "B",
    "C",
    "A",
    "A",
    "B",
    "C",
    "D",
    "A",
    "D",
    "A",
    "B",
    "C",
    "D",
    "A",
    "B",
    "C",
    "A",
    "A",
    "B",
    "C",
    "D",
    "A",
    "D",
    "A",
    "B",
    "C",
    "D",
    "A",
    "B",
    "C",
    "A",
    "A",
    "B",
    "C",
    "D",
    "A",
    "D",
    "A",
    "B",
    "C",
    "D",
    "A",
    "B",
    "C",
    "A",
    "A",
    "B",
    "C",
    "D",
    "A",
    "D",
    "B",
    "D",
    "A",
  ];

  const groupSize = 10;
  const optionGroups = [];

  for (let i = 0; i < options.length; i += groupSize) {
    const groupOptions = options.slice(i, i + groupSize);
    const group = (
      <Card
        className={styles["options-container"]}
        key={`group-${i / groupSize}`}
      >
        {groupOptions.map((_, j) => {
          const number = i + j + 1;
          return (
            <OptionsInput
              key={`op-${number}`}
              dontDefaultCheck={true}
              options={["A", "B", "C", "D", "E"]}
              onChange={() => {}}
              name={`${number}.-`}
              className={styles.options}
            />
          );
        })}
      </Card>
    );
    optionGroups.push(group);
  }

  return (
    <Layout title="Revisar">
      <Card className={styles.config}>
        <h2>Configuración</h2>
        <StandardInput
          name="Evaluación"
          value="Ensayo M1 N°2726"
          onChange={() => {}}
        />
        <StandardInput
          value={router?.query?.student as string}
          name="Estudiante"
          onChange={() => {}}
        />{" "}
      </Card>
      {optionGroups.map((group, i) => group)}
      <Button style={"small-active"}>Revisar</Button>
    </Layout>
  );
}
