import React, { ReactElement } from "react";
import CustomComponent from "./CustomComponent";
import GetDoc from "src/getDoc/GetDoc";
import { pdfNodes } from "..";
import GetPdfNode from ".";
import getID from "src/getDoc/utils/getId";

export default function Div({
  childrens  = [
    {
      type: "title",
      options: {
        id: getID(),
        text: "DIV",
        size: "h1",
      },
    },
  ],
  gap = "0px",
  id=getID(),
}: {
  gap?: string;
  childrens: {
    type: string;
    options: any;
  }[];
  id: string;
}) {
  const styles =
    gap &&
    ({
      display: "grid",
      gap: gap,
    } as any);
  return (
    <CustomComponent id={id} style={{}}> 
      <div style={styles}>
      {childrens.map((component, i) => (
          <GetPdfNode key={id + i} component={component} />
        ))}
      </div>
    </CustomComponent>
  );
}
