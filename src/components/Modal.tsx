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

const isEmpty = (obj: any) => {
  if (typeof obj !== "object") return true;
  if (JSON.stringify(obj) === "{}") return true;
  return false;
};

export const FormModal = (params: {
  buttonName?: string;
  modalState: boolean;
  title: string;
  values?: any;
  setModalState: (data: boolean) => void;
  children?: ReactNode;
  schema?: {}[];
  setData: (value: any) => void;
  onSubmit?: (data: any) => void;
}) => {
  const [values, setValues] = useState({});

  const addFormData = (data: any) => {
    Object.assign(values, data);
    setValues({ ...values });
    console.log(values);
    // debugger
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
                      values={values}
                      value={
                        !isEmpty(params?.values)
                          ? params.values[name]
                          : undefined
                      }
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
        <div className={styles["form-btn"]}>
          <Button
            onClick={() => {
              params.onSubmit && params.onSubmit(values);
              params.setData(values);
            }}
          >
            {params.buttonName ?? "Guardar"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
