/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Buttons from "@components/button/buttons/Buttons";
import Form from "../../../edit/components/form";
import { Component } from "src/app/documents/edit/models/component";
import ClientModal from "src/app/components/modal/client-modal";
import generateRandomId from "src/app/documents/utils/generateRandomId";
import { IdLenght } from "src/models/document.model";

export default function Children({
  value,
  onChange,
  parentId,
}: {
  types?: string[];
  value?: Component[];
  parentId: string;
  onChange: (value: { [key: string]: Component[] }) => void;
}) {
  const [modalState, setModalState] = useState(false);
  const [id, setId] = useState(`${parentId}-${generateRandomId(IdLenght.sm)}`);

  useEffect(() => {
    setId(`${parentId}-${generateRandomId(IdLenght.sm)}`);
  }, [value]);

  return (
    <div>
      <Buttons>
        <button
          className="text-xs hover:text-blue-500 active:text-blue-700"
          type="button"
          onClick={() => setModalState(true)}
        >
          Agregar hijo
        </button>
      </Buttons>
      <ClientModal
        setState={setModalState}
        state={modalState}
        title="Nuevo componente"
      >
        <Form
          modalState={modalState}
          defaultValues={{}}
          id={id}
          onSave={(data) => {
            onChange({ children: value?.length ? [...value, data] : [data] });
            setModalState(false);
          }}
        />
      </ClientModal>
    </div>
  );
}
