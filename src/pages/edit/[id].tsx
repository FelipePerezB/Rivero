import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Edit from "src/getDoc/Edit";
import Layout from "src/layout/Layout";
import { pdfNodes } from "src/schemas";

export default function NewDoc() {
  const router = useRouter();
  const { id } = router.query;
  // const data = {
  //   component: {},
  // };
  const docName = `doc-${id}`;
  const [doc, setDoc] = useState({} as any);
  useEffect(() => {
    if (!id) return;
    const storageDoc = localStorage.getItem(docName);
    if (storageDoc) setDoc(JSON.parse(storageDoc));
    else {
      const template = {
        type: "doc",
        options: {
          title: "New document",
          id,
          children: [
            {
              type: "page",
              options: {
                id: "CID8728732237",
                children: [],
              },
            },
          ],
        },
      };
      setDoc(template);
      // localStorage.setItem(docName, JSON.stringify(template));
    }
  }, [id]);

  const saveDoc = (document: any) => {
    localStorage.setItem(docName, JSON.stringify(document));
  };
  // return <></>;
  return doc?.options?.children && <Edit nodes={pdfNodes} saveDoc={saveDoc} doc={doc} />;
}
