import React from "react";
import styles from "../styles/reportTemplate.module.css";
import CustomComponent from "./CustomComponent";
import Title from "./Title";
import getID from "src/getDoc/utils/getId";

export default function DocInfo({
  title = "TITLE",
  subtitle = "SUBTITLE",
  id = getID(),
}: {
  title: string;
  subtitle: string;
  id: string;
}) {

  return (
    <CustomComponent id={id} style={{}}>
        <section className={styles["doc-info"]}>
          <h1 className={styles.title}>{title}</h1>
          <h2 className={styles.subtitle}>{subtitle}</h2>
        </section>
    </CustomComponent>
  );
}
