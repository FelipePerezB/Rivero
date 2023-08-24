import React, { ReactElement, ReactNode, useEffect } from "react";
import styles from "../styles/reportTemplate.module.css";
import CustomComponent from "./CustomComponent";
import GetDoc from "src/getDoc/GetDoc";
import { pdfNodes } from "..";
import GetPdfNode from ".";
import getID from "src/getDoc/utils/getId";
import DocInfo from "./DocInfo";

export default function Page({
  id,
  number,
  children,
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
  children: {
    options: any;
    type: string;
  }[];
}) {
  return (
    <CustomComponent id={id} style={{}}>
      <div id={"page-" + index} className={styles.page}>
        <div className={styles["page__content"]}>
          {number === 1 && (
            <DocInfo
              subtitle={docInfo?.subtitle}
              title={docInfo?.title}
              id="_"
            />
          )}
          {children?.map((component, i) => (
            <GetPdfNode component={component} key={id + i} />
          ))}
          <span className={styles["page__number"]}>{number}</span>
        </div>
      </div>
    </CustomComponent>
  );
}
