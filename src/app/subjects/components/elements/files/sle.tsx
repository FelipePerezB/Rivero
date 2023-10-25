import React from "react";

export default function SLE({
  options: { ec1 = "6x - 3y = 12", ec2 = "2x + 5y = 14" } = {},
  id,
}: {
  options: {
    ec1?: string;
    ec2?: string;
  };
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
    <div
      data-component={id}
      id={id}
      style={{
        width: "max-content",
        height: "max-content",
        margin: "0 auto",
      }}
    >
      <div style={styles.SLE}>
        <span style={styles.ecuation}>{ec1}</span>
        <span style={styles.ecuation}>{ec2}</span>
      </div>
    </div>
  );
}
