import React, { useContext, useEffect } from "react";
import styles from "../styles/reportTemplate.module.css";
// import getComponent from "../utils/getComponent";
import Title from "./Title";
import CustomComponent from "./CustomComponent";
import GetDoc from "src/getDoc/GetDoc";
import { pdfNodes } from "..";
import GetPdfNode from ".";
import getID from "src/getDoc/utils/getId";
import { ComponentContext } from "../web/Document";

export default function Exercises({
  id = getID(),
  childrens = [
    {
      type: "question",
      options: {
        id: getID(),
        question: "Lorem?",
        alternatives: "Si",
      },
    },
  ],
  startsIn = "1",
  isAnEvaluation = false,
}: {
  isAnEvaluation?: boolean;
  startsIn?: string;
  childrens: {
    type: string;
    options: {
      id: string;
      question: string;
      alternatives: string;
      children?: {
        type: string;
        options: any;
      };
    };
  }[];
  id: string;
}) {
  const startNumber = startsIn ?? "1";

  return (
    <CustomComponent id={id} style={{}}>
      <section className={styles.exercises}>
        {!isAnEvaluation && startNumber === "1" && (
          <h1 className={styles.subtitle}>{"PRÁCTICA"}</h1>
        )}
        {isAnEvaluation && startNumber === "1" && (
          <h1 className={styles.subtitle}>{"EVALUACIÓN"}</h1>
        )}
        {childrens?.map((component, i) => {
          const number = i + 1 + (Number(startNumber) - 1);
          return (
            <GetPdfNode
              key={id + number}
              component={{
                type: component.type,
                options: { ...component.options, number },
              }}
            />
          );
        })}
      </section>
    </CustomComponent>
  );
}
