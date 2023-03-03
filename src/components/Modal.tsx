import React, { ReactNode, useState } from "react";
import styles from "@styles/Modal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import SwitchToogle from "./SwitchToogle";

export default function Modal({
  modalState,
  options,
  setModalState,
  children,
  title,
}: {
  modalState: boolean;
  setModalState: any;
  children?: ReactNode;
  title: string;
  options?: {
    text: string;
    switchToogleConfig?: {
      setState: any;
      state: boolean;
    };
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
        <ul>
          {options?.map((op) => {
            if (op.switchToogleConfig)
              return (
                <Op
                  key={op.text}
                  text={op.text}
                  switchToogleOp={{
                    setState: op.switchToogleConfig.setState,
                    state: op.switchToogleConfig.state,
                  }}
                />
              );
            if (op.selectConfig)
              return (
                <Op key={op.text} text={op.text} selectOp={op.selectConfig} />
              );
          })}
        </ul>
        {children}
      </div>
    </div>
  );
}

function Op({
  text,
  switchToogleOp,
  selectOp,
}: {
  switchToogleOp?: {
    state: boolean;
    setState: any;
  };
  selectOp?: string[];
  text: string;
}) {
  return (
    <li
      key={text}
      onClick={() => {
        switchToogleOp && switchToogleOp.setState(!switchToogleOp.state);
      }}
      className={styles.op__text}
    >
      <p>{text}</p>
      {switchToogleOp && <SwitchToogle state={switchToogleOp.state} />}
      {selectOp && (
        <select className={styles.modal__select}>
          {selectOp.map((op) => (
            <option key={op}>{op}</option>
          ))}
        </select>
      )}
    </li>
  );
}
