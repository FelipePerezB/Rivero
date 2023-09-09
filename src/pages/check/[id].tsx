import { SimpleCard } from "@components/Card";
import StandardInput from "@components/inputs/StandardInput/StandardInput";
import React from "react";
import Layout from "src/layout/Layout";
import styles from "@styles/Check.module.css";
import OptionsInput from "@components/inputs/OptionsInput/OptionsInput";

export default function Check() {
  const options = [
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
    "D",
    "A",
  ];
  return (
    <Layout title="Revisar">
      <SimpleCard className={styles.config}>
        <h2>Configuración</h2>
        <StandardInput
          name="Evaluación"
          value="Ensayo M1 N°2726"
          onChange={() => {}}
        />
        <StandardInput name="Estudiante" onChange={() => {}} />{" "}
      </SimpleCard>
      <SimpleCard className={styles["options-container"]}>
        <h2>Alternativas</h2>
        {options.map((_, i) => {
          return (
            <OptionsInput
              tabIndex={i}
              key={`op-${i + 1}`}
              dontDefaultCheck={true}
              options={["A", "B", "C", "D", "E"]}
              onChange={() => {}}
              name={`${i + 1}.-`}
              className={styles.options}
            />
          );
        })}
      </SimpleCard>
    </Layout>
  );
}
