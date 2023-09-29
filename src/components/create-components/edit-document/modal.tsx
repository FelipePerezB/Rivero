/* eslint-disable react-hooks/exhaustive-deps */
import Button from "@components/Button";
import Buttons from "@components/button/buttons/Buttons";
import Modal from "@components/modals/modal/Modal";
import GetComponent from "./get-component";
import { ReactNode, SetStateAction, useEffect, useState } from "react";
import { Component } from "src/pages/docs/edit/[id]";
import { onDeleteProps } from "src/utils/create-doc/onDelete";
import { onEditProps } from "src/utils/create-doc/onEdit";
import Options from "@components/Options";
import getInputs from "src/utils/create-doc/getInputs";
import Form from "../components/inputs/form";

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
  setData?: React.Dispatch<SetStateAction<{[key: string]: unknown}>>;
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
      <Form {...{ component, document, onDelete, onEdit, setModalState, setData }} />
    </Modal>
  );
}
