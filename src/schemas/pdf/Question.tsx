import React, { ReactElement } from "react";
import styles from "../styles/reportTemplate.module.css";
import CustomComponent from "./CustomComponent";
import GetPdfNode from ".";
import Paragraph from "./Paragraph";

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
  children?: {
    type: string;
    options: any;
  }[];
}) {
  return (
    <CustomComponent key={id} id={id} style={{}}>
      <article className={styles["question-container"]}>
        <div className={styles.question}>
          <span className={styles['question__number']}>{number}.-</span>
          <Paragraph text={question} id="_"/>
        </div>
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
                  <span>{`${letter[i]}) `}</span>
                  <span>{alternative}</span>
                </li>
              );
            })}
          </ol>
          {children?.length && (
            <div className={styles["question__image"]}>
              <GetPdfNode key={id + "-child"} component={children[0]} />
            </div>
            // <div className={styles["question__image"]}>{children}</div>
          )}
        </div>
      </article>
    </CustomComponent>
  );
}
