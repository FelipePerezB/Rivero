import React, { ReactNode, useEffect } from "react";
import styles from "../styles/Doc.module.css";
import getComponent from "../utils/getComponent";
import resize from "../utils/resize";

export default function Document({
  childrens,
}: {
  childrens: {
    type: string;
    options: any;
  }[];
}) {
  useEffect(() => {
    resize(0.5);
  }, []);
  return (
    <div id="doc-container" className={styles.docs}>
      <div className={styles.doc} id="doc">
        {childrens?.map(({ type, options }) => getComponent(type, options))}
      </div>
    </div>
  );
}
