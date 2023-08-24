/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useEffect, useState } from "react";
import styles from "../styles/web.module.css";
import GetWebNode from ".";
import GetPDF from "src/getDoc/getPDF";
import { faFilePdf, faSave } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

export const ComponentContext = createContext({});
export default function Doc({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: {
    type: string;
    options: any;
  }[];
}) {
  const { id } = useRouter().query as unknown as { id: string };
  const doc = { type: "doc", options: { children, title, subtitle, id } };
  const [document, setDocument] = useState<
    | {
        type: string;
        options: {
          children: any[];
          title: string;
          subtitle: string;
          id: string;
        };
      }
    | undefined
  >(undefined);

  const callbacks = [
    {
      callback: () => {
        setDocument(doc);
      },
      title: "Descargar PDF",
      icon: faFilePdf,
    },
    {
      callback: () => localStorage.setItem(`doc-${id}`, JSON.stringify(doc)),
      title: "Acceder sin internet",
      icon: faSave,
    },
  ];

  return (
    <div id="doc-container" className={styles.docs} data-subject={"Matemática"} data-topic={"Álgebra"}>
      <div className={styles.doc} id="doc">
        {children?.map((component, i) => {
          return (
            <GetWebNode
              key={"page-" + i}
              component={{
                type: component.type,
                options: {
                  callbacks,
                  ...component.options,
                  docInfo: { title, subtitle, id },
                  number: i + 1,
                },
              }}
            />
          );
        })}
      </div>
      {document && <GetPDF doc={document} setDoc={setDocument} />}
    </div>
  );
}
