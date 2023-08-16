import React from "react";
import CustomComponent from "./CustomComponent";
import GetDoc from "src/getDoc/GetDoc";
import { pdfNodes } from "..";
import GetPdfNode from ".";
import getID from "src/getDoc/utils/getId";

export default function Equality({
  exception,
  withBorder = false,
  children = [
    {
      type: "fraction",
      options: {
        id: getID(),
        numerator: "1",
        denominator: "200",
      },
    },
    {
      type: "fraction",
      options: {
        id: getID(),
        numerator: "2",
        denominator: "400",
      },
    },
  ],
  sign = "=",
  id = getID(),
}: {
  exception?: {
    sign: string;
    index: number;
  };
  withBorder?: boolean;
  children: {
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
      fontSize: "1em",
      display: "flex",
      alignItems: "center",
      gap: "0.4em",
    },
  };
  return (
    <CustomComponent id={id} style={{}}>
      <div style={styles.equality}>
        {children.map((component, i) => (
          <>
            <span key={component.type + "text"}>
              <GetPdfNode key={id + i} component={component} />
            </span>
            {exception?.index != i && i + 1 < children.length && (
              <span key={component.type + "sign"}>{sign}</span>
            )}
            {exception?.index == i && (
              <span key={component.type + "sign"}>{exception.sign}</span>
            )}
          </>
        ))}
      </div>
    </CustomComponent>
  );
}
