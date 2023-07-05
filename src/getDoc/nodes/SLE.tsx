import React from "react";
import CustomComponent from "./CustomComponent";

export default function SLE({
  ec1,
  ec2,
  id,
}: {
  ec1: string;
  ec2: string;
  id: string;
}) {
  const styles: any = {
    SLE: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      borderRight: "0.15em solid black",
      borderBottom: "0.15em solid black",
      padding: "0 0.3em 0.2em",
      borderEndEndRadius: "0.3em",
    },
    ecuation: {
      fontSize: "0.85em",
      display: "inlineBlock",
      width: "max-content",
    },
  };

  return (
    <CustomComponent
      active={false}
      id={id}
      style={{
        width: "max-content",
        height: "max-content",
        margin: "0.4em auto",
      }}
    >
      <div style={styles.SLE}>
        <span style={styles.ecuation}>{ec1}</span>
        <span style={styles.ecuation}>{ec2}</span>
      </div>
    </CustomComponent>
  );
}
