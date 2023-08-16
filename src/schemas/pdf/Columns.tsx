import React from "react";
import styles from "../styles/reportTemplate.module.css";
import CustomComponent from "./CustomComponent";
import GetDoc from "src/getDoc/GetDoc";
import { pdfNodes } from "..";
import GetPdfNode from ".";
import getID from "src/getDoc/utils/getId";

export default function Columns({
  gap,
  margin,
  children = [
    {
      type: "title",
      options: {
        id: getID(),
        text: "COL1",
        size: "h3",
      },
    },
    {
      type: "title",
      options: {
        id: getID(),
        text: "COL2",
        size: "h3",
      },
    },
  ],
  id = getID(),
}: {
  gap?: string;
  margin?: string;
  children: {
    type: string;
    options: any;
  }[];
  id: string;
}) {
  return (
    <CustomComponent id={id} style={{}}>
      <section id={id} style={{ gap, margin }} className={styles.separator}>
        {children.map((component, i) => (
          <GetPdfNode key={id + i} component={component} />
        ))}
      </section>
    </CustomComponent>
  );
}
