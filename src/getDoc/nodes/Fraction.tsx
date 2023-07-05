import React from "react";
import CustomComponent from "./CustomComponent";

export default function Fraction({
  numerator,
  denominator,
  id,
}: {
  numerator: string | number;
  denominator: string | number;
  id: string;
}) {
  const styles = {
    fraction: {
      width: "max-content",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    } as any,

    numerator: {
      borderBottom: "0.1em solid black",
    },
  };
  return (
    <CustomComponent active={false} id={id} style={{ width: "max-content" }}>
      <div style={styles.fraction}>
        <span style={styles.numerator}>{numerator}</span>
        <span>{denominator}</span>
      </div>
    </CustomComponent>
  );
}
