/* eslint-disable react-hooks/exhaustive-deps */
import Modal from "@components/modals/modal/Modal";
import { SetStateAction } from "react";
import { Component } from "../../models/component";
import { onDeleteProps } from "../../utils/onDelete";
import { onEditProps } from "../../utils/onEdit";
import Form from "./form";

type options = "Modificar" | "Hijos";
const types = {
  addChild: "Hijos" as options,
  edit: "Modificar" as options,
};

export default function ComponentModal({
  setData,
  component,
  modalType,
  modalState,
  setModalState,
  onDelete,
  onEdit,
  document,
}: {
  setData?: React.Dispatch<SetStateAction<{ [key: string]: unknown }>>;
  onDelete?: (props: onDeleteProps) => void;
  onEdit: (props: onEditProps) => void;
  document: Component;
  component: Component;
  modalType: "addChild" | "edit";
  modalState: boolean;
  setModalState: React.Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Modal title={"Modificar componente"} {...{ modalState, setModalState }}>
      <Form
        {...{ component, document, onDelete, onEdit, setModalState, setData }}
      />
    </Modal>
  );
}
