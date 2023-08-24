import React, { ReactNode, useState } from "react";
import styles from "@styles/Modal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import ModalInput from "src/getDoc/components/ModalInput";
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
          {children}
        </div>
      </div>,
      document.querySelector("#modal") as HTMLDivElement
    )
  ) : (
    <></>
  );
}

export const FormModal = (params: {
  modalState: boolean;
  title: string;
  setModalState: (data: boolean) => void;
  children?: ReactNode;
  schema: {}[];
  setData: (value: any) => void;
}) => {
  const [values, setValues] = useState({} as any);

  const addFormData = (data: any) => {
    const [key, value] = Object.entries(data)[0];
    values[key] = value;
    setValues(values);
  };

  return (
    <Modal {...params}>
      <div className={styles["form-modal"]}>
        <div className={styles.children}>
          {params.children}
          <form className={styles.form}>
            {params?.schema &&
              params.schema.map((schema) =>
                Object.entries(schema).map(([name, type]) => {
                  return (
                    <ModalInput
                      addFormData={addFormData}
                      key={name}
                      name={name}
                      type={type}
                    />
                  );
                })
              )}
          </form>
        </div>
        <Button callback={() => params.setData(values)}>Create</Button>
      </div>
    </Modal>
  );
};
