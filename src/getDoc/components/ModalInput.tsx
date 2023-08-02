/* eslint-disable react-hooks/exhaustive-deps */
// import { isArray } from "chart.js/dist/helpers/helpers.core";
import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/Modal.module.css";
import NewCompModal from "../containers/NewCompModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import resize from "../utils/resize";
import getID from "../utils/getId";

type component = {
  type?: string;
  options?:
    | {
        id: string;
      }
    | any;
};

type props = {
  name: string;
  type: any;
};

export default function ModalInput({
  type,
  value,
  name,
  addFormData,
}: {
  name: string;
  value?: any;
  type: string | any;
  addFormData: (data: any) => void;
}) {
  const Child = ({
    options,
    type,
    deleteChildCb,
  }: {
    options: {
      id: string;
    };
    type: string;
    deleteChildCb?: (id: string) => void;
  }) => (
    <div className={styles.child} key={options?.id}>
      <span>{capFirst(type)}</span>
      <span>{options?.id}</span>
      {deleteChildCb && (
        <FontAwesomeIcon
          className={styles["delete-child"]}
          icon={faClose}
          onClick={() => deleteChildCb(options?.id)}
        />
        // <span >-</span>
      )}
    </div>
  );

  const createFormData = (value: any) => {
    const data: any = {};
    data[name] = value;
    addFormData(data);
  };

  if (value) createFormData(value);

  const capFirst = (text: string) => {
    const [first, ...other] = text.split("");
    return first[0].toLocaleUpperCase() + other.join("");
  };

  const StandardInput = ({ name, type }: props) => (
    <input
      className={styles["standart-input"]}
      defaultValue={value}
      name={name}
      onChange={(event) => createFormData(event?.target?.value)}
      type={type as unknown as "string" | "number"}
    />
  );

  const OptionsInput = ({ options }: any) => (
    <>
      <label>
        <input
          className={styles["standart-input"]}
          name={options.join()}
          id="select-array"
          defaultValue={value}
          onChange={(event) => createFormData(event?.target?.value)}
          list={options.join()}
        />
      </label>
      <datalist id={options.join()}>
        {options.map((value: string) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </datalist>
    </>
  );

  const ChildrensInput = ({ child }: any) => {
    const defaultValue = Array.isArray(value) ? value : [];
    const [modalState, setModalState] = useState(false);
    const [modalData, setModalData] = useState<component>();
    const [lastChild, setLastChild] = useState<component>();
    const [children, setChildren] = useState<component[]>(defaultValue);
    const deleteChild = (id: string) => {
      const index = children.findIndex((comp) => comp?.options?.id === id);
      children.splice(index, 1);
      setChildren([...children]);
    };

    useEffect(() => {
      if (modalData && lastChild?.options?.id !== modalData?.options?.id) {
        setLastChild(modalData);
        setChildren([...children, modalData]);
      }
    }, [children, lastChild, modalData]);

    useEffect(() => {
      createFormData(children);
    }, [children]);

    return (
      <>
        {children[0] && (
          <div className={styles["children"]}>
            {children?.map(({ type, options }) => {
              if (!type) return;
              return (
                <Child
                  options={options}
                  deleteChildCb={deleteChild}
                  type={type}
                  key={options.id}
                />
              );
            })}
          </div>
        )}
        <Button style="secondary" onClick={() => setModalState(true)}>
          <span>Añadir hijo</span>
        </Button>
        <NewCompModal
          selectedComponent={
            child && {
              type: child,
              options: {
                id: getID(),
              },
            }
          }
          modalState={modalState}
          setModalState={setModalState}
          setModalData={setModalData}
        />
      </>
    );
  };
  const ChildInput = () => {
    const defaultValue = value ?? [];
    const [modalState, setModalState] = useState(false);
    const [modalData, setModalData] = useState<component>(defaultValue);
    
    useEffect(() => {
      console.log(modalData)
      if (modalData?.type) {
        createFormData([modalData]);
      }
    }, [modalData]);

    return (
      <>
        <article className={styles["child-input"]}>
          {modalData?.type && (
            <Child
              options={modalData.options}
              type={modalData.type}
              key={modalData.options?.id}
            />
          )}
        </article>

        <Button style="secondary" onClick={() => setModalState(true)}>
          <span> {!defaultValue?.options ? "Añadir" : "Reemplazar"}</span>
        </Button>
        {/* <button type="button" className={styles["children-input__add"]}>
        </button> */}
        <NewCompModal
          modalState={modalState}
          setModalState={setModalState}
          setModalData={setModalData}
        />
      </>
    );
  };

  const BooleanInput = () => {
    const [state, setState] = useState(value || false);
    useEffect(() => {
      createFormData(state);
    }, [state]);
    const handleToogle = () => {
      setState(!state);
    };
    return <div onClick={handleToogle}>{String(state)}</div>;
  };

  const SubInputs = ({ name, ...inputs }: any) => {
    const types = Object.entries(inputs);
    const [objectValues, setObjectValues] = useState({} as any);
    const addObjectData = (data: any) => {
      const key = Object.keys(data)[0];
      const value = Object.values(data)[0];
      objectValues[key] = value;
      setObjectValues(objectValues);
    };

    createFormData(objectValues);
    return (
      <div className={styles.list}>
        {types.map(([name, type]) => (
          <ModalInput
            key={name}
            name={name}
            type={type}
            addFormData={addObjectData}
          />
        ))}
      </div>
    );
  };

  const SubInputsArray = ({ name, ...data }: any) => {
    const inputs = Object.entries(data);
    const [objectValues, setObjectValues] = useState({} as any);
    const [elements, setElements] = useState(
      Array.isArray(value) ? value : ([] as any[])
    );

    const addObjectData = (data: any) => {
      const key = Object.keys(data)[0];
      const value = Object.values(data)[0];
      objectValues[key] = value;
    };
    useEffect(() => {
      createFormData(elements);
    }, [elements]);

    const deleteElement = (props: any[]) => {
      const index = elements?.findIndex((e) =>
        props.every((prop: any[]) => prop[1] === e[prop[0]])
      );
      elements.splice(index, 1);
      setElements([...elements]);
    };

    return (
      <div className={styles.subInput}>
        <div>
          {inputs.map(([name, type]) => (
            <ModalInput
              key={name}
              name={name}
              type={type}
              addFormData={addObjectData}
            />
          ))}
        </div>
        <div className={styles.cards}>
          {elements?.map((element) => {
            const props = Object.entries(element) as any;
            return (
              <div key={props[0]} className={styles["card-container"]}>
                <div className={styles["card"]}>
                  {props?.map(([key, value]: string[]) => {
                    return (
                      <div key={value + key}>
                        <span className={styles["card-text"]}>
                          {capFirst(key)}: {value}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className={styles["card-options"]}>
                  <FontAwesomeIcon
                    // size="1x"
                    className={styles.delete}
                    onClick={() => deleteElement(props)}
                    icon={faClose}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <Button
          style="tertiary"
          onClick={() => {
            setElements([...elements, { ...objectValues }]);
          }}
        >
          <span>Añadir</span>
        </Button>
      </div>
    );
  };

  const CallbackInput = ({
    callback,
    text,
  }: {
    callback: () => any;
    text: string;
  }) => {
    return (
      <Button style="secondary" onClick={callback}>
        <span>{text}</span>
      </Button>
    );
  };

  const RangeInput = () => {
    const resizeContainer = ({ value }: { value: string }) => {
      resize(Number(value) / 100);
    };
    return (
      <input
        min={0}
        max={100}
        onChange={({ target }) => resizeContainer(target)}
        type="range"
      />
    );
  };

  const inputTypes: any = {
    text: (props: any) => <StandardInput {...props} />,
    number: (props: any) => <StandardInput {...props} />,
    children: (props: any) => <ChildrensInput {...props} />,
    boolean: (props: any) => <BooleanInput {...props} />,
    options: (props: any) => <OptionsInput {...props} />,
    subInputs: (props: any) => <SubInputs {...props} />,
    subInputsArray: (props: any) => <SubInputsArray {...props} />,
    child: (props: any) => <ChildInput {...props} />,
    callback: (props: any) => <CallbackInput {...props} />,
    range: (props: any) => <RangeInput {...props} />,
  };

  const getInput = () => {
    let props = {
      name,
      type,
    };
    if (typeof type === "object") {
      const { type, ...newProps } = props?.type;
      newProps.name = props?.name;
      return inputTypes[type](newProps);
    }
    return inputTypes[type](props);
  };

  return (
    <label htmlFor={name} key={name}>
      <span>{capFirst(name)}:</span>
      {getInput()}
    </label>
  );
}
