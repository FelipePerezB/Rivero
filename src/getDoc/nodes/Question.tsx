import React, { ReactElement } from "react";
import styles from "../styles/reportTemplate.module.css";
import LineChart from "./LineChart";
import CustomComponent from "./CustomComponent";
import getID from "../utils/getId";

export default function Question({
  id,
  number,
  question,
  alternatives,
  children,
}: {
  id: string;
  number: number;
  question: string;
  alternatives: string;
  children?: ReactElement;
}) {
  return (
    <CustomComponent
    key={id}
      active={false}
      id={id}
      style={{}}
    >
      <article className={styles["question-container"]}>
        <p className={styles.question}>
          {number}.- {question}
        </p>
        <div className={styles["separator-center"]}>
          <ol className={styles["question__alternatives"]}>
            {alternatives.split(",").map((alternative, i) => {
              const letter = {
                0: "A",
                1: "B",
                2: "C",
                3: "D",
                4: "E",
              } as any;
              return (
                <li key={alternative + i}>
                  <span>{`${letter[i]}) `}</span>
                  <span>{alternative}</span>
                </li>
              );
            })}
          </ol>
          <div className={styles["question__image"]}>{children}</div>
        </div>
      </article>
    </CustomComponent>
  );
}
