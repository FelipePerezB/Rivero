/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Buttons from "@components/common/buttons/buttons/Buttons";
// import Form from "../../../edit/components/form";
import { Component } from "src/app/documents/edit/models/component";
import ClientModal from "@components/modal/client-modal";
import generateRandomId from "src/app/(main)/subjects/utils/generateRandomId";
import { IdLenght } from "src/models/document.model";
import Form from "src/app/documents/edit/components/form";

export default function Children({
  value,
  onChange,
  types,
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
          types={types}
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
