import { schemas, uiSchemas } from "../utils/getComponent";
import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/Modal.module.css";
import ModalInput from "../components/ModalInput";
import { createPortal } from "react-dom";
import getID from "../utils/getId";
import Button from "../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import GetDoc from "../GetDoc";
import { pdfNodes } from "src/schemas";

type useStateFunc = (data: any) => void;
export default function Modal({
  selectedComponent,
  setModalState,
  modalState,
  setModalData,
}: {
  selectedComponent?: {
    type: string;
    options: any;
  };
  modalState: boolean;
  setModalState: useStateFunc;
  setModalData: useStateFunc;
}) {
  const componentsNames = Object.keys(schemas).map((e) => e.toLowerCase());
  const uiComponentsNames = Object.keys(uiSchemas).map((e) => e.toLowerCase());

  const getSchema = () => {
    const schema = Object.entries(schemas).find(
      ([name, data]) => name.toLowerCase() === component.toLowerCase()
    );
    if (schema) return schema[1] as any;
  };
  const [currentSchema, setCurrentSchema] = useState("" as any);
  const [componentSchema, setComponentSchema] = useState("" as any);
  const [component, setComponent] = useState("");
  const [values, setValues] = useState({} as any);

  useEffect(() => {
    if (!modalState) {
      const $selectComponent = document.getElementById(
        "select-component"
      ) as HTMLInputElement;
      if ($selectComponent) {
        $selectComponent.value = "";
      }
      setComponent("");
      setCurrentSchema({});
      setComponentSchema("");
    }
  }, [modalState]);

  const addFormData = (data: any) => {
    const [key, value] = Object.entries(data)[0];
    values[key] = value;
    setValues(values);
  };

  const createComponent = (data: any) => {
    let newComponent = {
      type: component,
      options: {
        id: selectedComponent ? selectedComponent?.options?.id : getID(),
      },
    };

    const schema = getSchema();

    schema &&
      Object.keys(schema)?.forEach((key) => {
        let newOp = {} as any;
        newOp[key] = data[key];
        Object.assign(newComponent, {
          ...newComponent,
          options: {
            ...newComponent.options,
            ...newOp,
          },
        });
      });
    setModalData(newComponent);
    setModalState(false);
  };

  useEffect(() => {
    // setCurrentSchema({})
    if (selectedComponent?.options) {
      const schema = getSchema();
      schema && setCurrentSchema(schema);
      setComponent(selectedComponent.type);
      setComponentSchema(Object.values(selectedComponent?.options));
    } else{
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedComponent, currentSchema]);

  useEffect(() => {
    const schema = getSchema();
    schema && setCurrentSchema(schema);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [component]);

  if (modalState) {
    return createPortal(
      <>
        <div onClick={() => setModalState(false)} className={styles.blur}></div>
        <div className={styles.modal}>
          <div className={styles.container}>
            <div className={styles.header}>
              <h2>Crear componente</h2>
              <FontAwesomeIcon
                onClick={() => setModalState(false)}
                className={styles.close__icon}
                size="xl"
                icon={faClose}
              />
            </div>
            {!selectedComponent && (
              <div className={styles.selectComponent}>
                <ul className={styles.nodes}>
                  {uiComponentsNames.map((component) => (
                    <li key={component + "-select"}>
                      <input
                        value={component.toLowerCase()}
                        onChange={({ target }) => setComponent(target.value)}
                        name="AAA"
                        type={"radio"}
                        className={styles["radio-btn"]}
                      />
                      <span className={styles.node}>
                        <GetDoc
                          nodes={pdfNodes}
                          component={{
                            type: component.toLowerCase(),
                            options: {},
                          }}
                        />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <form className={styles.form}>
              {currentSchema &&
                Object.entries(currentSchema).map(([name, type], i) => {
                  return (
                    <ModalInput
                      addFormData={addFormData}
                      name={name}
                      key={name}
                      type={type as any}
                      value={
                        selectedComponent && selectedComponent.options[name]
                      }
                    />
                  );
                })}
            </form>
            <Button
              style="primary"
              onClick={() => {
                createComponent(values);
              }}
            >
              <span>Save</span>
            </Button>
          </div>
        </div>
      </>,
      document.querySelector("#modal") as HTMLDivElement
    );
  } else return <></>;
}
