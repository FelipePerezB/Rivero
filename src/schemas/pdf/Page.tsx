import React, { ReactElement, ReactNode } from "react";
import styles from "../styles/reportTemplate.module.css";
import CustomComponent from "./CustomComponent";
import GetDoc from "src/getDoc/GetDoc";
import { pdfNodes } from "..";
import GetPdfNode from ".";
import getID from "src/getDoc/utils/getId";

export default function Page({
  id,
  number,
  childrens,
  index,
  docInfo,
}: {
  number: number;
  docInfo?: {
    title: string;
    subtitle: string;
  };
  id: string;
  index: number;
  childrens: {
    options: any;
    type: string;
  }[];
}) {
  return (
    <CustomComponent id={id} style={{}}>
      <div id={"page-" + index} className={styles.page}>
        <div className={styles["page__content"]}>
          {number === 1 && (
            <GetPdfNode
              component={{
                type: "DocInfo",
                options: { id: getID(), ...docInfo },
              }}
              key={id + "-doc-info"}
            />
          )}
          {childrens?.map((component, i) => (
            <GetPdfNode component={component} key={id + i} />
          ))}
          <span className={styles["page__number"]}>{number}</span>
        </div>
      </div>
    </CustomComponent>
  );
}
