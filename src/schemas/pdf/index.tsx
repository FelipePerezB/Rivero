import React from "react";
import GetDoc from "src/getDoc/GetDoc";
import { pdfNodes } from "..";

export default function GetPdfNode({
  component,
}: {
  component: { type: string; options: any };
}) {
  return <GetDoc component={component} nodes={pdfNodes} />;
}
