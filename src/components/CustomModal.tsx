import React, { ReactNode, useEffect, useState } from "react";
import styles from "@styles/Modal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import SwitchToogle from "./SwitchToogle";
import Button from "./Button";
import { useRouter } from "next/router";
import Modal from "./Modal";

type types = "select" | "boolean" | "text";

export default function CustomModal({
  modalState,
  options,
  setModalState,
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
  data?: any[]
}) {
  const [values, setValues] = useState({} as any);
  const addFormData = (data: any) => {
    const key = Object.keys(data)[0];
    const value = Object.values(data)[0];
    values[key] = value;
    setValues(values);
  };


  return (
    <Modal setModalState={setModalState} modalState={modalState} title={title}>
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
          }}
        >
          Save
        </Button>
      )}
      {/* {children} */}
    </Modal>
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
          className={styles.modal__select}
        >
          {selectConfig?.map((op) => (
            <option key={op}>{op}</option>
          ))}
        </datalist>
      </label>
    ),
    boolean: <SwitchToogle createFormData={createFormData}/>,
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
