/* eslint-disable react-hooks/exhaustive-deps */
import { schemas, uiSchemas } from "../utils/getComponent";
import React, { useEffect, useState } from "react";
import styles from "../styles/Modal.module.css";
import getID from "../utils/getId";
import GetDoc from "../GetDoc";
import { pdfNodes } from "src/schemas";
import { FormModal } from "@components/Modal";
import capFirst from "src/utils/capFirst";

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
  const [component, setComponent] = useState("");
  const [modalName, setModalName] = useState("");
  const [values, setValues] = useState({} as any);
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
    if (selectedComponent?.options) {
      const schema = getSchema();
      schema && setCurrentSchema(schema);
      setComponent(selectedComponent.type);
    } else {
    }
  }, [selectedComponent, currentSchema]);

  useEffect(() => {
    const schema = getSchema();
    schema && setCurrentSchema(schema);
  }, [component]);
  // const name = (component) ? `Modificar ${component}` : "Crear componente" 

  useEffect(() => {
    if (typeof values !== "object") return;
    if (JSON.stringify(values) === "{}") return;
    createComponent({ ...values });
  }, [values]);

  return (
    <FormModal
      title={selectedComponent?.type ? `Modificar ${selectedComponent?.type}` : "Crear componente"}
      setData={setValues}
      setModalState={setModalState}
      modalState={modalState}
      values={selectedComponent && selectedComponent.options}
      schema={
        (currentSchema &&
          Object.entries(currentSchema).map(([key, value]) => {
            const obj = {} as any;
            obj[key] = value;
            return obj;
          })) ||
        null
      }
    >
      {!selectedComponent && (
        <div className={styles["select-component"]}>
          <ul className={styles.nodes}>
            {uiComponentsNames.map((component, i) => (
              <li key={component + "-select-" + i}>
                <input
                  value={component.toLowerCase()}
                  onChange={({ target }) => setComponent(target.value)}
                  name="AAA"
                  type={"radio"}
                  className={styles["radio-btn"]}
                />
                <span className={styles.node}>
                  <GetDoc
                    key={component + "-component"}
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
    </FormModal>
  );
}
