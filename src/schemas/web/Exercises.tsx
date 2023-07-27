/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useState,
} from "react";
import styles from "../styles/web.module.css";
import CustomComponent from "./CustomComponent";
import GetWebNode from ".";
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
  const startNumber = startsIn ?? "1";
  return (
    <CustomComponent id={id} style={{}}>
      <form className={styles.exercises}>
        {!isAnEvaluation && startNumber === "1" && (
          <h1 className={styles.subtitle}>{"PRÁCTICA"}</h1>
        )}
        {childrens?.map((component, i) => {
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
        <button className={styles["form-btn"]} onClick={() => setCheck(true)} type="button">
          Revisar
        </button>
      </form>
    </CustomComponent>
  );
}
