import getComponent from "../utils/getComponent";
import React from "react";
import CustomComponent from "./CustomComponent";

export default function Equality({
  exception,
  withBorder = false,
  childrens,
  sign,
  id,
}: {
  exception?: {
    sign: string;
    index: number;
  };
  withBorder?: boolean;
  childrens: {
    type: string;
    options: any;
  }[];
  sign: string;
  id: string;
}) {
  const styles = {
    equality: {
      border: withBorder ? "1px solid black" : "none",
      borderRadius: "2px",
      padding: withBorder ? "6px" : "0",
      justifyContent: "center",
      fontSize: "12px",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
  };
  return (
    <CustomComponent active={false} id={id} style={{}}>
      <div style={styles.equality}>
        {childrens.map(({ type, options }, i) => (
          <>
            <span key={type + "text"}>{getComponent(type, options)}</span>
            {exception?.index != i && i + 1 < childrens.length && (
              <span key={type + "sign"}>{sign}</span>
            )}
            {exception?.index == i && (
              <span key={type + "sign"}>{exception.sign}</span>
            )}
          </>
        ))}
      </div>
    </CustomComponent>
  );
}
