import React, { useEffect, useState } from "react";
import styles from "../styles/reportTemplate.module.css";
import resize from "./utils/resize";
import { createPortal } from "react-dom";
import GetDoc from "src/getDoc/GetDoc";
import { pdfNodes } from "..";
import GetPdfNode from ".";

export default function Doc({
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
        {childrens?.map((component, i) => (
          <GetPdfNode key={'page-' + i} component={component} />
        ))}
      </div>
    </div>
  );
}
