import React  from "react";
import styles from "../styles/reportTemplate.module.css";
import getComponent from "../utils/getComponent";
import Title from "./Title";
import CustomComponent from "./CustomComponent";

export default function Exercises({
  id,
  childrens,
  startsIn,
  isAnEvaluation = false,
}: {
  isAnEvaluation?: boolean;
  startsIn?: string;
  childrens: {
    type: string;
    options: {
      question: string;
      alternatives: string;
      children?: {
        type: string;
        options: any;
      };
    };
  }[];
  // questions: {
  //   question: string;
  //   alternatives: string;
  //   children?: {
  //     type: string;
  //     options: any;
  //   };
  // }[];
  id: string;
}) {
  const startNumber = startsIn ?? "1";
  return (
    <CustomComponent active={false} id={id} style={{}}>
      <section className={styles.exercises}>
        {!isAnEvaluation && startNumber === "1" && (
          // <Title text="PÁCTICA" size="h2" />
          <h1 className={styles.subtitle}>{"PRÁCTICA"}</h1>
        )}
        {childrens?.map(({ options }, i) => {
          // {questions.map(({ question, alternatives, children }, i) => {
          const number = i + 1 + (Number(startNumber) - 1);
          return getComponent("question", { number, ...options });
          // <Question
          //   key={`question-${num}-${question.substring(10)}}`}
          //   number={num}
          //   question={question}
          //   alternatives={alternatives}
          // >
          //   {children && getComponent(children?.type, children?.options)}
          // </Question>
        })}
      </section>
    </CustomComponent>
  );
}
