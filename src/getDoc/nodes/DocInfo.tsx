import React from "react";
import styles from "../styles/reportTemplate.module.css";
import CustomComponent from "./CustomComponent";
import Title from "./Title";

export default function DocInfo({
  title,
  subtitle,
  id,
}: {
  title: string;
  subtitle: string;
  id: string;
}) {
  return (
    <CustomComponent active={false} id={id} style={{}}>
      <section className={styles["doc-info"]}>
        {/* <Title text={title} size="h1"/> */}
        {/* <Title text={subtitle} size="h2"/> */}
        <h1 className={styles.title}>{title}</h1>
        <h2 className={styles.subtitle}>{subtitle}</h2>
      </section>
    </CustomComponent>
  );
}
