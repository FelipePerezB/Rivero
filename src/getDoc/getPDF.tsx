import React, { useEffect, useRef, useState } from "react";
import { generatePdf } from "./utils/generatePDF";
import { api } from "./utils/api";
import { useQuery } from "@apollo/client";
import { GetDocDocument } from "src/gql/graphql";
import GetDoc from "./GetDoc";
import { pdfNodes } from "src/schemas";

export default function GetPDF({ id }: { id: number }) {
  const [doc, setDoc] = useState<{ type: string; options: any }>();
  const { data, loading } = useQuery(GetDocDocument, {
    variables: {
      docId: id,
    },
  });

  useEffect(() => {
    if (data) {
      setDoc(data.doc.content);
    }
  }, [data]);

  useEffect(() => {
    generatePdf();
    setDoc(undefined);
  }, [doc]);

  if (doc) return <GetDoc component={doc} nodes={pdfNodes}/>;
  else return <></>;
}
