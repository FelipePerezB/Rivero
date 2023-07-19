import React, { ReactNode } from "react";
import styles from "@styles/Modal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

type types = "select" | "boolean" | "text";

export default function Modal({
  modalState,
  setModalState,
  children,
  title,
}: {
  callback?: (data: any) => void;
  modalState: boolean;
  title: string;
  setModalState: any;
  children?: ReactNode;
  options?: {
    type: types;
    text: string;
    setState?: any;
    state?: boolean;
    selectConfig?: string[];
  }[];
}) {
  return (
    <div key={title} className={styles[`${modalState ? "on" : "off"}`]}>
      <div onClick={() => setModalState(false)} className={styles.blur}></div>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>{title}</h2>
          <FontAwesomeIcon
            onClick={() => setModalState(false)}
            className={styles.close__icon}
            size="xl"
            icon={faClose}
          />
        </div>
        {children}
      </div>
    </div>
  );
}
