import React from "react";
import styles from "../styles/web.module.css";
import CustomComponent from "./CustomComponent";

export default function Title({
  text,
  id,
  size = "h2",
}: {
  id?: string;
  text: string;
  size?: string;
}) {
  const node = (
    <>
      {size === "h1" && <h1 className={styles.title}>{text}</h1>}
      {size === "h2" && <h2 className={styles.subtitle}>{text}</h2>}
      {size === "h3" && <h3 className={styles.h3}>{text}</h3>}
    </>
  );

  return (
    <>
      {id ? (
        <CustomComponent id={id} style={{}}>
          {node}
        </CustomComponent>
      ) : (
        { node }
      )}
    </>
  );
}
