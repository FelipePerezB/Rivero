import React from "react";
import styles from "@styles/DocCard.module.css";
import Link from "next/link";

export default function DocCard({
  doc,
  href,
}: {
  href?: string;
  doc: { options: { title: string }; type: string };
}) {
  const Card = (
    <li key={doc.options.title} className={styles["documents__card"]}>
      <div className={styles.content}>
        {/* <GetDoc nodes={pdfNodes} component={{ ...doc }} /> */}
      </div>
      <div className={styles.info}>
        <span className={styles.info__text}>{doc.options.title}</span>
      </div>
    </li>
  );
  return href ? <Link {...{ href }}>{Card}</Link> : Card;
}
