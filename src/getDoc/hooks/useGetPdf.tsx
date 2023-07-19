import React, { useEffect, useRef, useState } from "react";
import getComponent from "../utils/getComponent";
import { generatePdf } from "../utils/generatePDF";

export default function GetPDF({ state, doc }: { state: boolean, doc: any }) {
  useEffect(() => {
    if (state) generatePdf();
  }, [state]);
  return <>{getComponent(doc.type, doc.options)};</>;
}
