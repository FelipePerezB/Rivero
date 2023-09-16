import { ReactNode, useState } from "react";
import styles from "@styles/Modal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { createPortal } from "react-dom";

export default function Modal({
  modalState,
  setModalState,
  children,
  title,
}: {
  modalState: boolean;
  title: string;
  setModalState: any;
  children?: ReactNode;
}) {
  return modalState ? (
    createPortal(
      <div key={title} className={styles[`${modalState ? "on" : "off"}`]}>
        <div onClick={() => setModalState(false)} className={styles.blur}></div>
        <div className={styles.modal}>
          <div className={styles.header}>
            <h2>{title}</h2>
            <span onClick={() => setModalState(false)}>
              <FontAwesomeIcon
                className={styles.close__icon}
                size="xl"
                icon={faClose}
              />
            </span>
          </div>
          <div className={styles.children}>{children}</div>
        </div>
      </div>,
      document.querySelector("#modal") as HTMLDivElement
    )
  ) : (
    <></>
  );
}
