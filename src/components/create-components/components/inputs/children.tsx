import OptionsInput from "@components/inputs/OptionsInput/OptionsInput";
import { componentsNames } from "src/getDoc/utils/getComponent";
import Modal from "@components/modals/modal/Modal";
import { ReactNode, SetStateAction, useEffect, useMemo, useState } from "react";
import { Component } from "src/pages/docs/edit/[id]";
import generateRandomId from "src/utils/generateRandomId";
import Buttons from "@components/button/buttons/Buttons";
import Preview from "@components/create-components/edit-document/preview";
import Form from "./form";

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
  const [currentChildren, setCurrentChildren] = useState<Component[]>(
    value || []
  );

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
      <Modal {...{ modalState, setModalState }} title="Nuevo componente">
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
            setData: setNewComponent,
            component: newChild,
            document,
            onChange: (data) => {
              setA(data as unknown as Component);
            },
          }}
        />
      </Modal>
    </div>
  );
}
