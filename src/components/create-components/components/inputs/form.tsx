/* eslint-disable react-hooks/exhaustive-deps */
import Button from "@components/Button";
import Options from "@components/Options";
import Buttons from "@components/button/buttons/Buttons";
import GetComponent from "@components/create-components/edit-document/get-component";
import React, { ReactNode, SetStateAction, useEffect, useState } from "react";
import { Component } from "src/pages/docs/edit/[id]";
import getInputs from "src/utils/create-doc/getInputs";
import { onDeleteProps } from "src/utils/create-doc/onDelete";
import { onEditProps } from "src/utils/create-doc/onEdit";

type options = "Modificar" | "Hijos";

export default function Form({
  component,
  document,
  setModalState,
  onDelete,
  onEdit,
}: {
  document: Component;
  component: Component;
  setModalState: React.Dispatch<SetStateAction<boolean>>;
  onEdit: (props: onEditProps) => void;
  onDelete: (props: onDeleteProps) => void;
}) {
  const [inputs, setInputs] = useState<ReactNode[] | undefined>([]);
  const [values, setValues] = useState({});

  const addFormData = (data: { [key: string]: unknown }) => {
    Object.assign(values, data);
    setValues({ ...values });
  };

  useEffect(() => {
    const inputs = getInputs(component?.type, component, addFormData);
    if (!inputs) setOption("Hijos");
    setInputs(inputs);
  }, [component?.options, component?.type]);

  const [option, setOption] = useState<options>("Modificar");
  const options = component.options.children
    ? inputs
      ? ["Modificar", "Hijos"]
      : ["Hijos"]
    : ["Modificar"];

  return (
    <div>
      <Options {...{ option, setOption, options }} />
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
    </div>
  );
}
