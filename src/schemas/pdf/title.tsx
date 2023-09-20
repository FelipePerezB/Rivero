import React from "react";
import styles from "../styles/reportTemplate.module.css";
import CustomComponent from "./CustomComponent";
import getID from "src/getDoc/utils/getId";

export default function Title({
  text = "TITLE",
  id = getID(),
  size = "h1",
}: {
  id?: string;
  text: string;
  size?: string;
}) {
  return (
    <>
      <CustomComponent
        id={id}
        style={{ width: "max-content", margin: size !== "h3" ? "0 auto" : "0" }}
      >
        {size === "h1" && <h1 className={styles.title}>{text}</h1>}
        {size === "h2" && <h2 className={styles.subtitle}>{text}</h2>}
        {size === "h3" && <h3 className={styles.h3}>{text}</h3>}
      </CustomComponent>
    </>
  );
}
