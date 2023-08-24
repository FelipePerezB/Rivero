/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import styles from "../styles/web.module.css";
import CustomComponent from "./CustomComponent";
import GetWebNode from ".";
import { useRouter } from "next/router";
export default function Exercises({
  id,
  children,
  startsIn,
  isAnEvaluation = false,
}: {
  isAnEvaluation?: boolean;
  startsIn?: string;
  children: {
    type: string;
    options: {
      question: string;
      alternatives: string;
      expectedAns: string;
      children?: {
        type: string;
        options: any;
      };
    };
  }[];
  id: string;
}) {
  const [check, setCheck] = useState(false);
  const query = useRouter()?.query;
  const startNumber = startsIn ?? "1";

  const [docData, setDocData] = useState({} as any);
  useEffect(() => {
    const doc = document.getElementById("doc-container");
    const data = {
      subject: doc?.getAttribute("data-subject"),
      topic: doc?.getAttribute("data-topic"),
      id: query.id as string,
    };
    data && setDocData(data);
  }, []);

  const saveResults = () => {
    const strData = localStorage.getItem("subjects-stats");
    const data = strData ? JSON.parse(strData) : {};
    const { subject, id, topic } = docData;

    if (!data[subject]) data[subject] = {};
    if (!data[subject][topic]) data[subject][topic] = [];
    !data[subject][topic].includes(id) && data[subject][topic].push(id);

    localStorage.setItem("subjects-stats", JSON.stringify(data));
  };

  return (
    <CustomComponent id={id} style={{}}>
      <form className={styles.exercises}>
        <div
          title="Revisar alternativas"
          onClick={() => {
            setCheck(true);
            isAnEvaluation && saveResults();
          }}
          className={styles["excercises__header"]}
        >
          {!isAnEvaluation && startNumber === "1" && (
            <h1 className={styles.subtitle}>{"PRÁCTICA"}</h1>
          )}
          {isAnEvaluation && startNumber === "1" && (
            <h1 className={styles.subtitle}>{"EVALUACIÓN"}</h1>
          )}
        </div>
        {children?.map((component, i) => {
          const number = i + 1 + (Number(startNumber) - 1);
          return (
            <GetWebNode
              key={id + number}
              component={{
                type: component.type,
                options: {
                  ...component.options,
                  number,
                  check,
                  setCheck,
                },
              }}
            />
          );
        })}
      </form>
    </CustomComponent>
  );
}
