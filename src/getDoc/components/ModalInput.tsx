/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/Modal.module.css";
import NewCompModal from "../containers/NewCompModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBold,
  faChevronDown,
  faChevronUp,
  faClose,
  faIndent,
  faItalic,
} from "@fortawesome/free-solid-svg-icons";
// import Button from "./Button";
import resize from "../utils/resize";
import getID from "../utils/getId";
import OptionsInput from "../../components/inputs/OptionsInput/OptionsInput";
import StandardInput from "../../components/inputs/StandardInput/StandardInput";
import ChildrenInput from "../../components/inputs/ChildrenInput/ChildrenInput";
import Button from "@components/Button";
import SwitchToogle from "@components/SwitchToogle";
import SwitchInput from "@components/inputs/SwitchInput/SwitchInput";
import { Editor } from "novel";
import EditorP from "./novel/Editor";

type component = {
  type?: string;
  options?:
    | {
        id: string;
      }
    | any;
};

export default function ModalInput({
  type,
  value,
  values,
  name,
  addFormData,
}: {
  name: string;
  value?: any;
  values?: any;
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
      )}
    </div>
  );

  const createFormData = (newValue: any) => {
    if (!newValue) return;
    const data: any = {};
    data[name] = newValue;
    addFormData(data);
  };

  // useEffect(() => {
  //   if (value) createFormData(value);
  // }, []);

  const capFirst = (text: string) => {
    const [first, ...other] = text.split("");
    return first[0].toLocaleUpperCase() + other.join("");
  };

  // const ChildrenInput = ({ child }: any) => {
  //   const defaultValue = Array.isArray(value) ? value : [];
  //   const [modalState, setModalState] = useState(false);
  //   const [modalData, setModalData] = useState<component>();
  //   const [lastChild, setLastChild] = useState<component>();
  //   const [children, setChildren] = useState<component[]>(defaultValue);
  //   const deleteChild = (id: string) => {
  //     const index = children.findIndex((comp) => comp?.options?.id === id);
  //     children.splice(index, 1);
  //     setChildren([...children]);
  //   };

  //   useEffect(() => {
  //     addFormData(value);
  //   }, []);

  //   useEffect(() => {
  //     if (
  //       modalData &&
  //       modalData.options &&
  //       lastChild?.options?.id !== modalData?.options?.id
  //     ) {
  //       setChildren([...children, { ...modalData }]);
  //       setLastChild(modalData);
  //     }
  //   }, [children, lastChild, modalData]);

  //   // useEffect(() => {
  //   //   createFormData([...children]);
  //   // }, [children]);

  //   return (
  //     <>
  //       {children[0] && (
  //         <div className={styles["children"]}>
  //           {children?.map(({ type, options }) => {
  //             if (!type) return;
  //             return (
  //               <Child
  //                 options={options}
  //                 deleteChildCb={deleteChild}
  //                 type={type}
  //                 key={options.id}
  //               />
  //             );
  //           })}
  //         </div>
  //       )}
  //       <Button style="secondary" onClick={() => setModalState(true)}>
  //         <span>Añadir hijo</span>
  //       </Button>
  //       <NewCompModal
  //         selectedComponent={
  //           child && {
  //             type: child,
  //             options: {
  //               id: getID(),
  //             },
  //           }
  //         }
  //         modalState={modalState}
  //         setModalState={setModalState}
  //         setModalData={setModalData}
  //       />
  //     </>
  //   );
  // };
  const ChildInput = () => {
    const defaultValue = value ?? [];
    const [modalState, setModalState] = useState(false);
    const [modalData, setModalData] = useState<component>(defaultValue);

    useEffect(() => {
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
        <NewCompModal
          modalState={modalState}
          setModalState={setModalState}
          setModalData={setModalData}
        />
      </>
    );
  };

  // const BooleanInput = () => {
  //   const [state, setState] = useState(value || false);
  //   useEffect(() => {
  //     createFormData(state);
  //   }, [state]);
  //   const handleToogle = () => {
  //     setState(!state);
  //   };
  //   return (
  //     <span className={styles.boleean}>
  //       <button
  //         type="button"
  //         onClick={handleToogle}
  //         className={styles["switch-toogle-" + state]}
  //       >
  //         <div></div>
  //       </button>
  //       <span>{String(state)}</span>
  //     </span>
  //   );
  // };

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
          style="small-active"
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
      <Button style="small-active" onClick={callback}>
        <span>{text}</span>
      </Button>
    );
  };

  const RangeInput = () => {
    const resizeContainer = ({ value }: { value: string }) => {
      resize(Number(value) / 100);
    };
    return (
      <label className={styles.range}>
        <span>{capFirst(name)}</span>
        <input
          min={0}
          max={100}
          onChange={({ target }) => resizeContainer(target)}
          type="range"
        />
      </label>
    );
  };

  const DescriptionInput = () => {
    const [content, setContent] = useState<string>(value ?? ("" as string));
    const parentRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
      content && createFormData(content);
    }, [content]);

    useEffect(() => {
      if (!parentRef.current) return;
      parentRef.current.innerHTML = content;
    }, [content]);

    useEffect(() => {
      if (!parentRef?.current) return;
      parentRef.current.addEventListener("keydown", () => {
        if (!parentRef?.current) return;
        createFormData(parentRef?.current?.innerHTML);
      });
      parentRef.current.addEventListener("click", () => {
        if (!parentRef?.current) return;
        setContent(parentRef?.current?.innerHTML);
      });
    }, []);

    const select = (style: string) => {
      const selection = window.getSelection();
      if (!selection?.anchorOffset) return;
      const { anchorNode, anchorOffset, focusOffset } = selection;
      const node = anchorNode as any;
      if (!node.data) return;
      const data = node?.data.split("") as string[];
      length = focusOffset - anchorOffset;

      if (length < 1) {
        const originalData = data.splice(0, anchorOffset).join("");

        setContent(
          content.length > 1
            ? content.replace(
                originalData,
                `<span style="${style}">${originalData}</span>`
              )
            : `<span style="${style}">${originalData}</span>`
        );
      } else {
        const originalData = data.splice(anchorOffset, length).join("");

        setContent(
          content.replace(
            originalData,
            `<span style="${style}">${originalData}</span>`
          )
        );
      }
    };

    const [indentBtnClass, setIndentBtnClass] = useState(
      values?.indent ? styles["btn--active"] : styles["bold-btn"]
    );

    const bold = () => select("font-weight: 900");
    const italic = () => select("font-style: italic");
    const increase = () => select("font-size: 1.4em");
    const decrease = () => select("font-size: 0.8em");
    const indent = () => {
      addFormData({ indent: !values?.indent });
      setIndentBtnClass(
        values?.indent ? styles["btn--active"] : styles["bold-btn"]
      );
    };

    return (
      <div>
        <div
          contentEditable={true}
          style={{ textIndent: values?.indent && "2em" }}
          className={styles.parent}
          ref={parentRef}
        ></div>
        <div className={styles.btns}>
          <div>
            <button className={styles["bold-btn"]} type="button" onClick={bold}>
              <FontAwesomeIcon icon={faBold} />
            </button>
            <button
              className={styles["bold-btn"]}
              type="button"
              onClick={italic}
            >
              <FontAwesomeIcon icon={faItalic} />
            </button>
            <button
              className={styles["bold-btn"]}
              type="button"
              onClick={increase}
            >
              <FontAwesomeIcon icon={faChevronUp} />
            </button>
            <button
              className={styles["bold-btn"]}
              type="button"
              onClick={decrease}
            >
              <FontAwesomeIcon icon={faChevronDown} />
            </button>
          </div>
          <div>
            <button onClick={indent} className={indentBtnClass} type="button">
              <FontAwesomeIcon icon={faIndent} />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const inputTypes: any = {
    text: ({ name }: { name: string }) => (
      <StandardInput
        value={value}
        name={name}
        onChange={addFormData}
        type="text"
      />
    ),
    number: ({ name }: { name: string }) => (
      <StandardInput name={name} onChange={addFormData} type="number" />
    ),
    description: (props: any) => <EditorP {...props} value={value} addFormData={addFormData}/>,
    // description: (props: any) => <DescriptionInput {...props} />,
    children: (props: any) => (
      <ChildrenInput
        name={name}
        value={value}
        onChange={addFormData}
        {...props}
      />
    ),
    // children: (props: any) => <ChildrenInput {...props} />,
    boolean: (props: any) => <SwitchInput onChange={addFormData} {...props} />,
    options: ({ options }: { options: string[] }) => (
      <OptionsInput
        name={name}
        value={value}
        onChange={addFormData}
        options={options}
      />
    ),
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
    <>
      {!type?.private && (
        <label className={styles.input} htmlFor={name} key={name}>
          {/* <span>{capFirst(name)}:</span> */}
          {getInput()}
        </label>
      )}
    </>
  );
}
