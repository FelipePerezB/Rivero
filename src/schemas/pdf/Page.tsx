import React, { ReactElement, ReactNode } from "react";
import styles from "../styles/reportTemplate.module.css";
import CustomComponent from "./CustomComponent";
import GetDoc from "src/getDoc/GetDoc";
import { pdfNodes } from "..";
import GetPdfNode from ".";

export default function Page({
  id,
  childrens,
  index,
}: {
  id: string;
  index: number;
  childrens: {
    options: any;
    type: string;
  }[];
}) {
  return (
    <CustomComponent id={id} style={{}}>
      <div
        id={"page-" + index}
        className={styles.page}
      >
        {childrens?.map((component, i) => (
          <GetPdfNode component={component} key={id + i} />
        ))}
      </div>
    </CustomComponent>
  );
}
