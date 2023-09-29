/* eslint-disable react-hooks/exhaustive-deps */
import Button from "@components/Button";
import Options from "@components/Options";
import Buttons from "@components/button/buttons/Buttons";
import GetComponent from "@components/create-components/edit-document/get-component";
import React, { ReactNode, SetStateAction, useEffect, useState } from "react";
import { Component } from "src/pages/docs/edit/[id]";
import getInputs from "src/utils/create-doc/getInputs";
import getSchema from "../../utils/getSchema";
import { onDeleteProps } from "src/utils/create-doc/onDelete";
import { onEditProps } from "src/utils/create-doc/onEdit";
import Children from "./children";
import FormChildren from "@components/create-components/edit-document/form-children";

type options = "Configuración" | "Hijos";

export default function Form({
  setData,
  component,
  document,
  setModalState,
  onDelete,
  onEdit,
  onChange,
}: {
  setData?: React.Dispatch<SetStateAction<{ [key: string]: unknown }>>;
  onChange?: (data: { [key: string]: unknown }) => void;
  document: Component;
  component: Component;
  setModalState?: React.Dispatch<SetStateAction<boolean>>;
  onEdit?: (props: onEditProps) => void;
  onDelete?: (props: onDeleteProps) => void;
}) {
  const [inputs, setInputs] = useState<ReactNode[] | undefined>([]);
  const [values, setValues] = useState<{ children?: Component[] }>({});

  const [options, setOptions] = useState<string[]>([]);
  const [option, setOption] = useState<options | undefined>("Configuración");

  const addFormData = (newData: { [key: string]: unknown }) => {
    Object.assign(values, newData);
    setValues({ ...values });
    onChange &&
      onChange({
        ...component,
        options: { ...newData, ...values },
      });
  };

  const children = values.children;
  useEffect(() => {
    addFormData({ children: component.options.children });
    const schemas = getSchema(component.type);
    if (schemas?.length) {
      setInputs(
        schemas?.map(({ options: data, type }, i) => {
          if (type === "children") {
            if (schemas.length === 1) {
              setOptions(["Hijos"]);
              setOption("Hijos");
            } else setOptions(["Configuración", "Hijos"]);
            return;
          }
          if (!options.length) setOptions(["Configuración"]);
          const value = component.options[data.key];
          return (
            <GetComponent
              key={"input-" + i}
              attrs={{
                ...data,
                dataKey: data?.key,
                value,
                parentId: component.id,
                onChange: addFormData,
              }}
              folder="inputs"
              name={type as string}
            />
          );
        })
      );
    }
  }, [component?.options, component?.type]);

  return (
    <div className="flex flex-col gap-2">
      <Options {...{ option, setOption, options: options }} />
      {option === "Configuración" && <>{inputs?.map((input) => input)}</>}

      {option === "Hijos" && (
        <div>
          <FormChildren
            {...{
              document,
              onChange: addFormData,
              parentId: component.id,
              children,
            }}
          />
          <GetComponent
            folder="inputs"
            attrs={{
              setParentModalState: setModalState,
              onEdit,
              onDelete,
              document,
              parentId: component.id,
              value: values?.children,
              onChange: addFormData,
            }}
            name="children"
          />
        </div>
      )}
      <div className="mt-2">
        <Buttons>
          {(onEdit || setData) && (
            <Button
              onClick={() => {
                setData &&
                  setData((data) => ({
                    ...component,
                    options: { ...data, ...values },
                  }));
                component?.id &&
                  onEdit &&
                  onEdit({
                    id: component.id,
                    page: document,
                    newProps: values,
                  });
                setModalState && setModalState(false);
              }}
              color="blue"
            >
              Guardar
            </Button>
          )}
          {onDelete && (
            <Button
              onClick={() => {
                component?.id && onDelete({ id: component.id, page: document });
                setModalState && setModalState(false);
              }}
              color="red"
            >
              Eliminar
            </Button>
          )}
        </Buttons>
      </div>
    </div>
  );
}
