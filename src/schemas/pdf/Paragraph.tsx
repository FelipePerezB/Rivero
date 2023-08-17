import React from "react";
import CustomComponent from "./CustomComponent";
import styles from "../styles/reportTemplate.module.css";
import getID from "src/getDoc/utils/getId";

export default function Paragraph({
  id = getID(),
  fontSize = "0.8",
  ident = false,
  text = "Paragraph: Lo rem ipsum do sit. Amet consectetur adipisicing.",
}: {
  fontSize: string,
  ident: boolean;
  id: string;
  text: string;
}) {
  return (
    <CustomComponent id={id} style={{ width: "max-content", height: "min-content" }}>
      <p
        style={{ textIndent: ident ? "1.2rem" : "0", fontSize: fontSize + "em"}}
        className={styles.paragrah}
      >
        {text}
      </p>
    </CustomComponent>
  );
}
