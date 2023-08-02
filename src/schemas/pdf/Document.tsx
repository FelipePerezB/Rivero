import React, { useEffect, useState } from "react";
import styles from "../styles/reportTemplate.module.css";
import resize from "./utils/resize";
import GetPdfNode from ".";

export default function Doc({
  title,
  subtitle,
  childrens,
}: {
  title: string;
  subtitle: string;
  childrens: {
    type: string;
    options: any;
  }[];
}) {
  // const [docInfo, setDocInfo] = useState({
  //   title,
  //   subtitle,
  // });

  // useEffect(() => {
  //   if (!subtitle || !title) return;
  //   setDocInfo({
  //     title,
  //     subtitle,
  //   });
  // }, [title, subtitle]);

  useEffect(() => {
    resize(0.5);
  }, []);
  return (
    <div id="doc-container-pdf" className={styles.docs}>
      <div className={styles.doc} id="doc-pdf">
        {childrens?.map((component, i) => (
          <GetPdfNode
            key={"page-" + i}
            component={{
              type: component.type,
              options: {
                ...component.options,
                docInfo: {
                  title,
                  subtitle,
                },
                number: i + 1,
              },
            }}
          />
        ))}
      </div>
    </div>
  );
}
