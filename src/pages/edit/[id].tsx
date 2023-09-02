/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from "@apollo/client";
import Button from "@components/Button";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Edit from "src/getDoc/Edit";
import OptionsInput from "@components/inputs/OptionsInput/OptionsInput";
import StandardInput from "@components/inputs/StandardInput/StandardInput";
import { GetDocDocument } from "src/gql/graphql";
import Layout from "src/layout/Layout";
import { pdfNodes } from "src/schemas";
import { toast } from "react-hot-toast";

export default function NewDoc() {
  const router = useRouter();
  const { id } = router.query;

  const { data, error } = useQuery(GetDocDocument, {
    variables: {
      where: {
        externalId: id as string,
      },
    },
    fetchPolicy: "network-only",
  });

  const docName = `doc-${id}`;
  const [doc, setDoc] = useState({} as any);
  useEffect(() => {
    console.log("AA")
    const storageDoc = localStorage.getItem(docName);
    if (data) {
      const document = JSON.parse(data.doc.content);

      Object.assign(document, {
        options: { id: data.doc.id, ...document.options },
      });
      setDoc(document);
      if (storageDoc === data?.doc?.content) toast.success("Sincronizado!");
      else {
        toast(
          (t) => (
            <span>
              El documento esta desincronizado
              <Button
                onClick={() => {
                  setDoc(JSON.parse(storageDoc as string));
                  toast.dismiss(t.id);
                }}
              >
                Usar local
              </Button>
              <Button
                style="small-active"
                onClick={() => {
                  toast.dismiss(t.id);
                  saveDoc(document);
                }}
              >
                Sincronizar
              </Button>
            </span>
          ),
          { duration: 10000 }
        );
      }
      return;
    } else if (id && storageDoc) {
      toast.error("Estas sin conexión");
      setDoc(JSON.parse(storageDoc));
    } else {
      const template = {
        type: "doc",
        options: {
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
    }
  }, [data, error, id]);

  const saveDoc = (document: any) => {
    localStorage.setItem(docName, JSON.stringify(document));
    toast.success("Guardado!");
  };

  return doc?.options?.children ? (
    <Edit nodes={pdfNodes} saveDoc={saveDoc} doc={doc} />
  ) : (
    <></>
  );
}
