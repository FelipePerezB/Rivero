import React from "react";
import styles from "@styles/DocCard.module.css";
import Link from "next/link";
import Card from "./Card";

export default function DocCard({
  doc,
  href,
}: {
  href?: string;
  doc: { options: { title: string }; type: string };
}) {
  const Node = (
    <Card >
      <div className={styles.content}>
        {/* <GetDoc nodes={pdfNodes} component={{ ...doc }} /> */}
      </div>
      <div className={styles.info}>
        <span className={styles.info__text}>{doc.options.title}</span>
      </div>
    </Card>
    // <li key={doc.options.title} className={styles["documents__card"]}>
    // </li>
  );
  return href ? <Link {...{ href }}>{Node}</Link> : Node;
}
