import React, { useEffect, useRef, useState } from "react";
import { generatePdf } from "./utils/generatePDF";
import { api } from "./utils/api";
import { useQuery } from "@apollo/client";
import { GetDocDocument } from "src/gql/graphql";
import GetDoc from "./GetDoc";
import { pdfNodes } from "src/schemas";

export default function GetPDF({
  id,
  content,
}: {
  id?: number;
  content: { childrens: any[] };
}) {
  console.log(content);
  const [doc, setDoc] = useState<{ type: string; options: any } | undefined>({
    type: "doc",
    options: content,
  });
  // const { data, loading } = useQuery(GetDocDocument, {
  //   variables: {
  //     docId: id,
  //   },
  // });
  // if (id) {
  //   if (!data) return <></>;
  //   setDoc(data.doc.content);
  // }

  // useEffect(() => {
  //   if (data) {
  //   }
  // }, [data]);

  useEffect(() => {
    if (doc?.options)
      (async () => {
        await generatePdf();
        const doc = document.getElementById('doc-pdf')
        console.log(doc)
        setDoc(undefined);
      })();
  }, [doc]);

  if (doc) return <GetDoc component={doc} nodes={pdfNodes} />;
  else return <></>;
}
