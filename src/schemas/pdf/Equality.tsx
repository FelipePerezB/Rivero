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
      outline: withBorder ? "0.1em solid black" : "none",
      borderRadius: "var(--radius)",
      padding: withBorder ? "0.2em 0.5em" : "0",
      justifyContent: "center",
      fontSize: "1em",
      display: "flex",
      alignItems: "center",
      gap: "0.8em",
      fontWeight: withBorder ? 700 : 500,
    },
  };
  return (
    <CustomComponent id={id} style={{ width: "max-content", margin: "0 auto" }}>
      <div style={styles.equality}>
        {children.map((component, i) => (
          <div key={component.type + "text"}>
            <span>
              <GetPdfNode key={id + `-${i}`} component={component} />
            </span>
            {exception?.index != i && i + 1 < children.length && (
              <span key={component.type + "sign"}>{sign}</span>
            )}
            {exception?.index == i && (
              <span key={component.type + "sign"}>{exception.sign}</span>
            )}
          </div>
        ))}
      </div>
    </CustomComponent>
  );
}
