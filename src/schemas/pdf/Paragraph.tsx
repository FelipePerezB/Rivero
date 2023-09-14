import React, { useEffect, useRef } from "react";
import CustomComponent from "./CustomComponent";
import styles from "../styles/reportTemplate.module.css";
import getID from "src/getDoc/utils/getId";
import GetNodeByString from "src/getDoc/components/GetNodeByString";
import EditorP from "src/getDoc/components/novel/Editor";
// import { Editor } from "novel";

export default function Paragraph({
  id = getID(),
  indent = false,
  text = "Paragraph: Lo rem ipsum do sit. Amet consectetur adipisicing.",
}: {
  indent?: boolean;
  id?: string;
  text: string;
}) {
  const paragraphRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!paragraphRef.current || !text) return;
    paragraphRef.current.innerHTML = text;
  }, [text]);

  return (
    <CustomComponent id={id} style={{ height: "max-content" }}>
      <div
        ref={paragraphRef}
        style={{
          textIndent: indent ? "1.2rem" : "0",
        }}
        className={styles.paragrah}
      >
        {text}
      </div>
    </CustomComponent>
  );
}
