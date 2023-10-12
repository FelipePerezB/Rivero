/* eslint-disable react-hooks/exhaustive-deps */
import Modal from "@components/modals/modal/Modal";
import { SetStateAction } from "react";
import Form from "../components/inputs/form";
import { Component } from "src/app/documents/edit/models/component";
import { onDeleteProps } from "src/app/documents/edit/utils/onDelete";
import { onEditProps } from "src/app/documents/edit/utils/onEdit";

type options = "Modificar" | "Hijos";
const types = {
  addChild: "Hijos" as options,
  edit: "Modificar" as options,
};

export default function ComponentModal({
  setData,
  component,
  modalState,
  setModalState,
  onDelete,
  onEdit,
  document,
}: {
  setData?: React.Dispatch<SetStateAction<{[key: string]: unknown}>>;
  onDelete?: (props: onDeleteProps) => void;
  onEdit: (props: onEditProps) => void;
  document: Component;
  component: Component;
  modalState: boolean;
  setModalState: React.Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Modal title={"Modificar componente"} {...{ modalState, setModalState }}>
      <Form {...{ component, document, onDelete, onEdit, setModalState, setData }} />
    </Modal>
  );
}
