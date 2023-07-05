import React from "react";
import styles from "../styles/reportTemplate.module.css";
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
  const styles = {
    h1: {
      width: "max-content",
      fontWeight: "700",
      fontSize: "1.8em",
      textAlign: "center",
      margin: "0.1em",
    },
    h2: {
      width: "max-content",
      fontWeight: "800",
      fontSize: "1em",
      textAlign: "center",
      margin: "0",
      marginBottom: "0.4em",
    },
    h3: {
      width: "max-content",
      fontWeight: "700",
      fontSize: "0.9em",
      margin: "0.2em 0",
    },
  } as any;
  const node = (
    <>
      {size === "h1" && <h1 style={styles.h1}>{text}</h1>}
      {size === "h2" && <h2 style={styles.h2}>{text}</h2>}
      {size === "h3" && <h3 style={styles.h3}>{text}</h3>}
    </>
  );

  return (
    <>
      {id ? (
        <CustomComponent
          active={false}
          id={id}
          style={
            size !== "h3"
              ? {
                  width: "max-content",
                  margin: "0 auto",
                }
              : {
                  width: "max-content",
                  margin: "0",
                }
          }
        >
          {node}
        </CustomComponent>
      ) : (
        { node }
      )}
    </>
  );
}
