import { components } from "../utils/getComponent";
import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/Modal.module.css";
import ModalInput from "../components/ModalInput";
import { createPortal } from "react-dom";
import getID from "../utils/getId";
import Button from "../components/Button";

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
  const componentsNames = Object.entries(components).map((e) => e[0]);
  const [currentSchema, setCurrentSchema] = useState("" as any);
  const [componentSchema, setComponentSchema] = useState("" as any);
  const [component, setComponent] = useState("");
  const [values, setValues] = useState({} as any);

  useEffect(() => {
    const $selectComponent = document.getElementById(
      "select-component"
    ) as HTMLInputElement;
    if ($selectComponent) {
      $selectComponent.value = "";
    }
    setComponent("");
    setComponentSchema("");
  }, [modalState]);

  const addFormData = (data: any) => {
    const key = Object.keys(data)[0];
    const value = Object.values(data)[0];
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

    Object.keys(components[component]?.schema)?.forEach((key) => {
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
    // debugger;
    if (selectedComponent) {
      setCurrentSchema(components[selectedComponent.type]?.schema);
      setComponent(selectedComponent.type);
      setComponentSchema(Object.values(selectedComponent?.options));
    }
  }, [selectedComponent, currentSchema]);

  useEffect(() => {
    const componentData = Object.entries(components)
      .find((c) => c[0] === component)
      ?.at(1) as any;
    setCurrentSchema(componentData?.schema);
  }, [component, componentsNames]);

  if (modalState) {
    return createPortal(
      <>
        <div onClick={() => setModalState(false)} className={styles.blur}></div>
        <div className={styles.modal}>
          <div className={styles.container}>
            {!selectedComponent && (
              <>
                <label>
                  <span>Tipo de componente:</span>
                  <input
                    className={styles.select}
                    id="select-component"
                    defaultValue={component}
                    onChange={(event) => {
                      const value = event?.target?.value;
                      if (componentsNames.includes(value)) setComponent(value);
                    }}
                    list="components"
                  />
                </label>
                <datalist id="components">
                  {componentsNames.map((component) => (
                    <option key={component} value={component}>
                      {component}
                    </option>
                  ))}
                </datalist>
              </>
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
                      value={componentSchema && componentSchema[i + 1]}
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
            {/* <button
              type="button"
              onClick={() => {
                createComponent(values);
              }}
            >
              Guardar
            </button> */}
          </div>
        </div>
      </>,
      document.querySelector("#modal") as HTMLDivElement
    );
  } else return <></>;
}
