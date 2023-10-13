/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import OptionsInput from "@components/inputs/OptionsInput/OptionsInput";
import Buttons from "@components/button/buttons/Buttons";
import Form from "../../../edit/components/form";
import { Component } from "src/app/documents/edit/models/component";
import ClientModal from "src/app/components/modal/client-modal";
import { componentsNames } from "src/app/documents/edit/utils/schemas";
import generateRandomId from "src/app/documents/utils/generateRandomId";
import Preview from "src/app/documents/edit/components/preview";

export default function Children({
  value,
  onChange,
  parentId,
  document,
  types,
}: {
  types?: string[];
  document: Component;
  value?: Component[];
  parentId: string;
  onChange: (value: { [key: string]: Component[] }) => void;
}) {

  const [modalState, setModalState] = useState(false);
  const [newChild, setNewChild] = useState<Component>({
    options: {},
    type: "",
    id: `${parentId}-${generateRandomId(4)}`,
  });

  const [newComponent, setNewComponent] = useState<Component | any>();

  useEffect(() => {
    if (a?.type) onChange && onChange({ children: [...(value || []), a] });
    setModalState(false);
  }, [newComponent]);

  const [a, setA] = useState<Component>();

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
        <OptionsInput
          name="Tipo de componente"
          dataKey="type"
          onChange={({ type }) => {
            const isValid = componentsNames.includes(type);
            if (!isValid) return;
            setNewChild((props) => ({ ...props, type }));
          }}
          options={types?.length ? types : componentsNames}
        />
        {a?.type && <Preview {...{ attrs: a }} />}
        <Form
          {...{
            modalState,
            setData: setNewComponent,
            component: newChild,
            document,
            onChange: (data) => {
              setA(data as unknown as Component);
            },
          }}
        />
      </ClientModal>
    </div>
  );
}
