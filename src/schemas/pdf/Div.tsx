import React, { ReactElement } from "react";
import CustomComponent from "./CustomComponent";
import GetDoc from "src/getDoc/GetDoc";
import { pdfNodes } from "..";
import GetPdfNode from ".";
import styles from "../styles/reportTemplate.module.css";
import getID from "src/getDoc/utils/getId";

export default function Div({
  direction = "column",
  gap = "0.5",
  children = [
    {
      type: "title",
      options: {
        id: getID(),
        text: "DIV",
        size: "h1",
      },
    },
  ],
  id = getID(),
}: {
  direction: "column" | "row";
  gap: string;
  children: {
    type: string;
    options: any;
  }[];
  id: string;
}) {
  return (
    <CustomComponent id={id} style={{}}>
      <div
        style={{ flexDirection: direction, gap: gap + "em" }}
        className={styles.div}
      >
        {children.map((component, i) => (
          <GetPdfNode key={id + i} component={component} />
        ))}
      </div>
    </CustomComponent>
  );
}
