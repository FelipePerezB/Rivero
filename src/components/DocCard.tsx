import React from "react";
import GetDoc from "src/getDoc/GetDoc";
import { pdfNodes } from "src/schemas";
import styles from "@styles/DocCard.module.css";

export default function DocCard({
  doc,
}: {
  doc: { options: { title: string }; type: string };
}) {
  return (
    <li key={doc.options.title} className={styles["documents__card"]}>
      <div className={styles.content}>
        <GetDoc nodes={pdfNodes} component={{ ...doc }} />
      </div>
      <div className={styles.info}>
        <span className={styles.info__text}>{doc.options.title}</span>
        {/* <FontAwesomeIcon className={styles.icon} icon={faBookmark} /> */}
      </div>
    </li>
  );
}
