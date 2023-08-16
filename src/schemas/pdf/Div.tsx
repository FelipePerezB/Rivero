import React, { ReactElement } from "react";
import CustomComponent from "./CustomComponent";
import GetDoc from "src/getDoc/GetDoc";
import { pdfNodes } from "..";
import GetPdfNode from "."
import styles from "../styles/reportTemplate.module.css";
import getID from "src/getDoc/utils/getId";

export default function Div({
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
  gap = "0px",
  id = getID(),
}: {
  gap?: string;
  children: {
    type: string;
    options: any;
  }[];
  id: string;
}) {
  // const styles = gap
  //   ? {
  //       display: "flex",
  //       gap: gap,
  //     }
  //   : {display: "flex", flexDirection: "column", "",
  // };
  return (
    <CustomComponent id={id} style={{}}>
      <div className={styles.div}>
        {children.map((component, i) => (
          <GetPdfNode key={id + i} component={component} />
        ))}
      </div>
    </CustomComponent>
  );
}
