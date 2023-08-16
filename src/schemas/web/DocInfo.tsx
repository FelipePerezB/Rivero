import React, { Component, useContext, useEffect, useState } from "react";
import styles from "../styles/web.module.css";
import CustomComponent from "./CustomComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowDown,
  faCircleCheck,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import GetPDF from "src/getDoc/getPDF";
import { ComponentContext, useContextState } from "./Document";
// import Title from "./Title";

export default function DocInfo({
  title,
  subtitle,
  id,
  docId,
}: {
  title: string;
  subtitle: string;
  id: string;
  docId: number;
}) {
  const {
    state: { doc },
  } = useContext(ComponentContext) as useContextState;
  const router = useRouter();
  const [pageId, setPageId] = useState<string>();
  useEffect(() => {
    setPageId(router.query?.id as string);
  }, [router.query]);
  const [download, setDownload] = useState<number | undefined>();

  const saveDoc = () => {
    localStorage.setItem(`doc-${docId}`, JSON.stringify(doc));
  };

  return (
    <>
      <CustomComponent id={id} style={{}}>
        <section className={styles["doc-info"]}>
          <h1 className={styles.title}>{title?.toUpperCase()}</h1>
          <h2 className={styles.subtitle}>{subtitle?.toUpperCase()}</h2>
        </section>
        <section className={styles.btns}>
          <button
            onClick={() => setDownload(Number(pageId))}
            className={styles.download}
          >
            <span>Descargar</span>
            <FontAwesomeIcon icon={faCircleArrowDown} />
          </button>
          <button onClick={() => router.push(`check/${pageId}`)}>
            <span>Revisar</span>
            <FontAwesomeIcon icon={faCircleCheck} />
          </button>
          <button onClick={saveDoc}>
            <span>Guardar</span>
            <FontAwesomeIcon icon={faSave} />
          </button>
        </section>
      </CustomComponent>
      {download && <GetPDF content={{ children: doc.options.children }} />}
      {/* {typeof download === "number" && <GetPDF content={state.doc} />} */}
    </>
  );
}
