/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import ClientModal from "@components/modal/client-modal";
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

  const updateDocument = (component: Component) => {
    component.id &&
      iterateObj(
        component?.id,
        parentComponent,
        (obj) => (obj.options = { ...obj.options, ...component.options })
      );
    setSettings({ ...settings });
    setModalState(false);
  };

  const deleteComponent = (component: Component) => {
    component.id &&
      iterateObj(component.id, parentComponent, (obj, parent) => {
        if (!parent?.options.children?.length) return;
        parent.options.children = parent.options.children?.filter(
          (child) => child.id !== obj.id
        );
      });
    setSettings({ ...settings });
    setModalState(false);
  };
  return parentComponent?.id && component?.id ? (
    <ClientModal
      setState={setModalState}
      state={modalState}
      title="Editar componente"
    >
      <Form
        defaultValues={{...component.options}}
        modalState={modalState}
        setModalState={setModalState}
        type={component.type}
        id={component.id}
        onSave={updateDocument}
        onDelete={deleteComponent}
      />
      <></>
    </ClientModal>
  ) : (
    <></>
  );
}
