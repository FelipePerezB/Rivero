import { useRouter } from "next/router";
import React from "react";
import Layout from "src/layout/Layout";
import styles from "@styles/Check.module.css";

export default function Doc() {
  const router = useRouter();
  const { id } = router.query;
  const title = id;
  const answers = ["A", "C", "E", "D", "A", "B", "B", "B", "A", "C", "A"];
  return (
    <Layout>
      <h1>{title}</h1>
      {answers.map((answer, i) => {
        const options = ["A", "B", "C", "D", "E"];
        return (
          <div key={i} className={styles.question}>
            <p>{i + 1}.-</p>
            <ol className={styles.options}>
              {options.map((option) => {
                return (
                  <li className={styles.option} key={i + option}>
                    <input className={styles.option__radio} name={`${i}`} type={"radio"} />
                    <span className={styles.option__text}>{option}</span>
                  </li>
                );
              })}
            </ol>
          </div>
        );
      })}
    </Layout>
  );
}
