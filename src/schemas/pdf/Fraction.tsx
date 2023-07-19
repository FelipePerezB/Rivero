import React from "react";
import CustomComponent from "./CustomComponent";
import getID from "src/getDoc/utils/getId";

export default function Fraction({
  numerator = "1",
  denominator = "100",
  id = getID(),
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
      borderBottom: "0.1em solid",
    },
  };
  return (
    <CustomComponent id={id} style={{ width: "max-content" }}>
      <div style={styles.fraction}>
        <span style={styles.numerator}>{numerator}</span>
        <span>{denominator}</span>
      </div>
    </CustomComponent>
  );
}
