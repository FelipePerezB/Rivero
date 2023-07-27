/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactElement, useContext, useEffect, useState } from "react";
import styles from "../styles/web.module.css";
import CustomComponent from "./CustomComponent";
import { ComponentContext, useContextState } from "./Document";

export default function Question({
  id,
  number,
  question,
  alternatives,
  children,
  setCheck,
  check,
  expectedAns,
}: {
  addAnswer: (answer: { number: number; alternative: string }) => void;
  setCheck: (bool: boolean) => boolean;
  expectedAns: string;
  check: boolean;
  id: string;
  number: number;
  question: string;
  alternatives: string;
  children?: ReactElement;
}) {
  const [answer, setAnswer] = useState();
  const [classname, setClassname] = useState("");

  useEffect(() => {
    if (!check) return;
    const name = answer === expectedAns ? "correct-ans" : "incorrect-ans";
    setClassname(name);
    // setResult(answer === expectedAns);
    setCheck(false);
  }, [check]);

  // const setAnswer = (alternative: string) => {
  //   addAnswer({ number, alternative });
  // };
  return (
    <CustomComponent key={id} id={id} style={{}}>
      <article className={styles[classname]}>
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
                <li
                  onClick={() => {
                    setClassname("");
                    setAnswer(letter[i]);
                  }}
                  className={styles.alternative}
                  key={alternative + i}
                >
                  <input
                    // onChange={}

                    className={styles["alternative-radio"]}
                    type="radio"
                    name={"alternative" + id}
                  />
                  <label
                    style={
                      classname === "correct-ans" && letter[i] === expectedAns
                        ? {
                            outline: "3px solid #46d37e",
                          }
                        : {}
                    }
                    className={styles["alternative-label"]}
                  >
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
