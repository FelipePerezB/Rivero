import React, { ReactNode, useEffect, useState } from "react";
import styles from "@styles/Modal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import SwitchToogle from "./SwitchToogle";
import Button from "./Button";
import { useRouter } from "next/router";

type types = "select" | "boolean" | "text";

export default function Modal({
  modalState,
  options,
  setModalState,
  children,
  title,
  callback,
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
  const router = useRouter();
  const [values, setValues] = useState({} as any);
  const addFormData = (data: any) => {
    const key = Object.keys(data)[0];
    const value = Object.values(data)[0];
    values[key] = value;
    setValues(values);
  };

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
        <ul className={styles.options}>
          {options?.map((op, i) => (
            <Op key={op.type + i} addFormData={addFormData} {...op} />
          ))}
        </ul>
        {options && (
          <Button
            style="primary"
            callback={() => {
              callback && callback(values);
              const id = "CID82828282";
              // router.push(`docs/edit/${id}`);
            }}
          >
            Save
          </Button>
        )}
        {children}
      </div>
    </div>
  );
}

function Op({
  addFormData,
  text,
  type,
  switchToogleOp,
  selectConfig,
}: {
  addFormData: (data: any) => any;
  switchToogleOp?: {
    state: boolean;
    setState: any;
  };
  type: types;
  selectConfig?: string[];
  text: string;
}) {
  const createFormData = (value: any) => {
    const data: any = {};
    data[text] = value;
    addFormData(data);
  };
  const node = {
    select: (
      <label>
        <input
          onChange={({ target }) => createFormData(target?.value)}
          list={selectConfig?.join()}
        />
        <datalist
          id={selectConfig?.join()}
          onChange={({ target }) => console.log(target)}
          className={styles.modal__select}
        >
          {selectConfig?.map((op) => (
            <option key={op}>{op}</option>
          ))}
        </datalist>
      </label>
    ),
    boolean: switchToogleOp && <SwitchToogle state={switchToogleOp.state} />,
    text: (
      <input
        onChange={({ target }) => createFormData(target?.value)}
        className={styles.op__input}
      />
    ),
  };
  return (
    <li
      key={text}
      onClick={() => {
        switchToogleOp && switchToogleOp.setState(!switchToogleOp.state);
      }}
      className={styles.op}
    >
      <span className={styles.op__text}>{text}</span>
      {node[type]}
    </li>
  );
}
