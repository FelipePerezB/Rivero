/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { generatePdf } from "./utils/generatePDF";
import GetDoc from "./GetDoc";
import { pdfNodes } from "src/schemas";

export default function GetPDF({
  setDoc,
  doc,
}: {
  setDoc: (data: any) => void;
  doc: {
    type: string;
    options: {
      children: any[];
      title: string;
      subtitle: string;
      id: string;
    };
  };
}) {
  useEffect(() => {
    if (doc?.options)
      (async () => {
        await generatePdf();
        setDoc(undefined);
      })();
  }, [doc]);

  if (doc) return <GetDoc component={{ ...doc }} nodes={pdfNodes} />;
  else return <></>;
}
