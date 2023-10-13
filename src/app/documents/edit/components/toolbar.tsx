/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./menu.module.css";
import React, { useEffect, useState } from "react";
import ClientModal from "src/app/components/modal/client-modal";
import onEdit from "../utils/onEdit";
import onDelete from "../utils/onDelete";
import getNode from "../utils/getNode";
import iterateObj from "../utils/iterateObj";
import { Component, NoteWithComponent } from "../models/component";
import Form from "./form";

export default function Toolbar({
  divRef,
  settings,
  setSettings,
}: {
  settings: NoteWithComponent;
  divRef?: React.RefObject<HTMLDivElement>;
  setSettings: React.Dispatch<React.SetStateAction<NoteWithComponent>>;
}) {
  const [modalState, setModalState] = useState(false);
  const [component, setComponent] = useState<Component>();
  const parentComponent = settings.file.content;

  useEffect(() => {
    if (divRef?.current)
      divRef.current.onclick = (event) => {
        const node = getNode(event.target as HTMLElement);
        const id = node?.dataset.component;
        if (id && parentComponent) {
          const getComponent = (obj?: Component) => {
            setComponent(obj);
            setModalState(true);
          };
          iterateObj(id, parentComponent, getComponent);
        }
      };
  }, [divRef, parentComponent]);

  const edit = (callback: () => void) => {
    callback();
    setSettings({ ...settings });
  };

  return parentComponent?.id && component?.id ? (
    <ClientModal
      setState={setModalState}
      state={modalState}
      title="Editar componente"
    >
      <Form
        modalState={modalState}
        setModalState={setModalState}
        component={component}
        document={parentComponent}
        onEdit={(data) => {
          edit(() => {
            component.id && onEdit(data);
          });
        }}
        onDelete={(data) => {
          edit(() => onDelete(data));
        }}
      />
      <></>
    </ClientModal>
  ) : (
    <></>
  );
}
