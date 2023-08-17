import React, { useEffect, useRef } from "react";
import CustomComponent from "./CustomComponent";
import styles from "../styles/reportTemplate.module.css";
import getID from "src/getDoc/utils/getId";
import GetNodeByString from "src/getDoc/components/GetNodeByString";

export default function Paragraph({
  id = getID(),
  fontSize = "0.8",
  ident = false,
  text = "Paragraph: Lo rem ipsum do sit. Amet consectetur adipisicing.",
}: {
  fontSize: string;
  ident: boolean;
  id: string;
  text: string;
}) {
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!paragraphRef.current) return;
    paragraphRef.current.innerHTML = text;
  }, [text]);

  return (
    <CustomComponent id={id} style={{ height: "min-content" }}>
      <p
        ref={paragraphRef}
        style={{
          textIndent: ident ? "1.2rem" : "0",
          fontSize: fontSize + "em",
        }}
        className={styles.paragrah}
      ></p>
    </CustomComponent>
  );
}
