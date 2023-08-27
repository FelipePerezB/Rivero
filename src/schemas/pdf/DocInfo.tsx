import React from "react";
import styles from "../styles/reportTemplate.module.css";
import getID from "src/getDoc/utils/getId";

export default function DocInfo({
  title = "TITLE",
  subtitle = "SUBTITLE",
  id = getID(),
}: {
  title?: string;
  subtitle?: string;
  id: string;
}) {
  return (
    <section className={styles["doc-info"]}>
      <h1 id="doc-title" className={styles.title}>
        {title?.toUpperCase()}
      </h1>
      <h2 className={styles.subtitle}>{subtitle?.toUpperCase()}</h2>
    </section>
  );
}
