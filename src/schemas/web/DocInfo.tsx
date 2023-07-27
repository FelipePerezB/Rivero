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
}: {
  title: string;
  subtitle: string;
  id: string;
}) {
  const { state } = useContext(ComponentContext) as useContextState;
  const router = useRouter();
  const [pageId, setPageId] = useState<string>();
  useEffect(() => {
    setPageId(router.query?.id as string);
  }, [router.query]);
  const [download, setDownload] = useState<number | undefined>();

  return (
    <>
      <CustomComponent id={id} style={{}}>
        <section className={styles["doc-info"]}>
          <h1 className={styles.title}>{title}</h1>
          <h2 className={styles.subtitle}>{subtitle}</h2>
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
          <button>
            <span>Guardar</span>
            <FontAwesomeIcon icon={faSave} />
          </button>
        </section>
      </CustomComponent>
      {download && <GetPDF content={state.doc} />}
      {/* {typeof download === "number" && <GetPDF content={state.doc} />} */}
    </>
  );
}
