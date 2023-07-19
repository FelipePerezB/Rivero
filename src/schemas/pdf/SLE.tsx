import React from "react";
import CustomComponent from "./CustomComponent";
import getID from "src/getDoc/utils/getId";

export default function SLE({
  ec1 = "2x + 5y = 14",
  ec2 = "6x - 3y = 12",
  id = getID(),
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
      borderRight: "0.15em solid",
      borderBottom: "0.15em solid",
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
