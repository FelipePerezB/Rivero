/* eslint-disable react-hooks/exhaustive-deps */
import Button from "@components/Button";
import styles from "./ChildrenInput.module.css";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Modal from "src/getDoc/containers/NewCompModal";
import getID from "src/getDoc/utils/getId";
import { capFirst } from "src/utils/capFirst";
import GetDoc from "src/getDoc/GetDoc";
import { GetDocDocument } from "src/gql/graphql";
import GetPdfNode from "src/schemas/pdf";
type component = {
  type: string;
  options:
    | {
        id: string;
      }
    | any;
};

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

export default function ChildrenInput({
  onChange,
  value,
  name,
  child,
}: {
  child: any;
  name: string;
  value: {}[];
  onChange: (data: any) => void;
}) {
  const defaultValue = Array.isArray(value) ? value : [];
  const [modalState, setModalState] = useState(false);
  const [modalData, setModalData] = useState<component>();
  const [lastChild, setLastChild] = useState<component>();
  const [children, setChildren] = useState<component[]>(defaultValue as any);
  const deleteChild = (id: string) => {
    const index = children.findIndex((comp) => comp?.options?.id === id);
    children.splice(index, 1);
    setChildren([...children]);
  };
  const createFormData = (data: {}[]) => {
    const obj = {} as any;
    obj[name] = data;
    onChange(obj);
  };
  useEffect(() => {
    createFormData(value);
  }, []);

  useEffect(() => {
    if (
      modalData &&
      modalData.options &&
      lastChild?.options?.id !== modalData?.options?.id
    ) {
      setChildren([...children, { ...modalData }]);
      setLastChild(modalData);
    }
  }, [children, lastChild, modalData]);

  useEffect(() => {
    createFormData([...children]);
  }, [children]);

  return (
    <div>
      <span className={styles.title}>Childrens</span>
      {children[0] && (
        <div className={styles["children"]}>
          {children?.map((child, i) => {
            if (!child.type) return;
            return (
              <div className={styles.child} key={`${name}-child-${i}`}>
                <GetPdfNode component={child} />
              </div>
              // <Child
              //   options={options}
              //   deleteChildCb={deleteChild}
              //   type={type}
              //   key={options.id}
              // />
            );
          })}
        </div>
      )}
      <Button style="small-active" onClick={() => setModalState(true)}>
        <span>Añadir hijo</span>
      </Button>
      <Modal
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
    </div>
  );
}
