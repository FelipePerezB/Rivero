import React from "react";
import CustomComponent from "./CustomComponent";
import styles from "../styles/web.module.css";
import getID from "src/getDoc/utils/getId";

export default function Paragraph({
  id = getID(),
  text = "Paragraph: Lo rem ipsum do sit. Amet consectetur adipisicing.",
}: {
  id: string;
  text: string;
}) {

  
  return (
    <CustomComponent id={id} style={{width: "100%", height: "min-content"}}>
      <p className={styles.paragrah}>{text}</p>
    </CustomComponent>
  );
}
