import React, { ReactElement } from "react";
import styles from "../styles/web.module.css";
import CustomComponent from "./CustomComponent";

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
  const setAnswer = (alternative: string) => {
    const value = {} as any;
    value[number] = alternative;
  };
  return (
    <CustomComponent key={id} id={id} style={{}}>
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
                <li className={styles.alternative} key={alternative + i}>
                  <input
                    onChange={() => setAnswer(letter[i])}
                    className={styles["alternative-radio"]}
                    type="radio"
                    name={"alternative" + id}
                  />
                  <label className={styles["alternative-label"]}>
                    <span>{`${letter[i]}) `}</span>
                    <span>{alternative}</span>
                  </label>
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
