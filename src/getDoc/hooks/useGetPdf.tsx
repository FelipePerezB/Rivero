import React, { useEffect, useRef, useState } from "react";
import { generatePdf } from "../utils/generatePDF";
import GetDoc from "../GetDoc";
import { pdfNodes } from "src/schemas";

export default function GetPDF({ state, doc }: { state: boolean, doc: any }) {
  useEffect(() => {
    if (state) generatePdf();
  }, [state]);
  // return <>{getComponent(doc.type, doc.options)};</>;
  return <GetDoc nodes={pdfNodes} component={doc}/>
}
