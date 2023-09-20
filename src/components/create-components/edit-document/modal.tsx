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

type options = "Modificar" | "Hijos";
const types = {
  addChild: "Hijos" as options,
  edit: "Modificar" as options,
};

export default function ComponentModal({
  component,
  modalType,
  modalState,
  setModalState,
  onDelete,
  onEdit,
  document,
}: {
  onDelete: (props: onDeleteProps) => void;
  onEdit: (props: onEditProps) => void;
  document: Component;
  component: Component;
  modalType: "addChild" | "edit";
  modalState: boolean;
  setModalState: React.Dispatch<SetStateAction<boolean>>;
}) {
  const [inputs, setInputs] = useState<ReactNode[] | undefined>([]);
  const [option, setOption] = useState<options>("Modificar");

  const [values, setValues] = useState({});
  const addFormData = (data: { [key: string]: unknown }) => {
    Object.assign(values, data);
    setValues({ ...values });
  };

  useEffect(() => {
    if (inputs) setOption(types[modalType]);
    if(!inputs) setOption("Hijos")
  }, [modalType, inputs]);

  useEffect(() => {
    const inputs = getInputs(component?.type, component, addFormData);
    if (!inputs) setOption("Hijos");
    setInputs(inputs);
  }, [component?.options, component?.type]);

  const titles = {
    Modificar: `Modificar ${component?.type}`,
    Hijos: `Agregar hijo`,
  };

  return (
    <Modal title={titles[option]} {...{ modalState, setModalState }}>
      <Options
        {...{ option, setOption }}
        options={
          component.options.children
            ? inputs
              ? ["Modificar", "Hijos"]
              : ["Hijos"]
            : ["Modificar"]
        }
      />
      {option === "Modificar" && (
        <>
          {inputs?.map((input) => input)}
          <Buttons>
            <Button
              onClick={() => {
                component?.id &&
                  onEdit({
                    id: component.id,
                    page: document,
                    newProps: values,
                  });
                setModalState(false);
              }}
              color="blue"
            >
              Actualizar
            </Button>
            <Button
              onClick={() => {
                component?.id && onDelete({ id: component.id, page: document });
                setModalState(false);
              }}
              color="red"
            >
              Eliminar
            </Button>
          </Buttons>
        </>
      )}

      {option === "Hijos" && (
        <GetComponent
          folder="inputs"
          attrs={{
            setParentModalState: setModalState,
            onEdit, 
            onDelete,
            document,
            parentId: component.id,
            value: component.options.children,
            onChange: addFormData,
          }}
          name="children"
        />
      )}
    </Modal>
  );
}
