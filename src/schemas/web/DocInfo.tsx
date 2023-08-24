import React from "react";
import styles from "../styles/web.module.css";
import CustomComponent from "./CustomComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";

export default function DocInfo({
  id,
  callbacks,
  title,
  subtitle,
}: {
  callbacks?: { callback: () => void; title: string; icon: IconDefinition }[];
  title: string;
  subtitle: string;
  id: string;
  docId: number;
}) {

  return (
    <>
      <CustomComponent id={id} style={{}}>
        <section className={styles["doc-info"]}>
          <h1 className={styles.title}>{title?.toUpperCase()}</h1>
          <div className={styles.categories}>
            <h2 className={styles.subtitle}>{subtitle?.toUpperCase()}</h2>
            {callbacks?.map(({ callback, title, icon }) => {
              if (!callback) return;
              return (
                <FontAwesomeIcon
                  key={"btn-" + title}
                  onClick={callback}
                  title={title}
                  className={styles.btn}
                  icon={icon}
                />
              );
            })}
          </div>
        </section>
      </CustomComponent>
    </>
  );
}
