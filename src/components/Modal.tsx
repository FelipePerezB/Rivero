import React, { ReactNode, useState } from "react";
import styles from "@styles/Modal.module.css";
import Button from "./Button";
import ModalInput from "src/getDoc/components/ModalInput";
import Modal from "@components/modals/modal/Modal";

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
