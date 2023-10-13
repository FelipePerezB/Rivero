/* eslint-disable react-hooks/exhaustive-deps */
import Button from "@components/Button";
import Options from "@components/Options";
import Buttons from "@components/button/buttons/Buttons";
import React, { ReactNode, SetStateAction, useEffect, useState } from "react";
import Children from "../../components/elements/inputs/children";
import { Component } from "src/app/documents/edit/models/component";
import { onEditProps } from "src/app/documents/edit/utils/onEdit";
import { onDeleteProps } from "src/app/documents/edit/utils/onDelete";
import getSchema from "../utils/getSchema";
import FormChildren from "./children-form";
import DynamicInput from "../../components/elements/inputs/dynamic-input";

type options = "Configuración" | "Hijos";

export default function Form({
  setData,
  component,
  document,
  modalState,
  setModalState,
  onDelete,
  onEdit,
  onChange,
}: {
  setData?: React.Dispatch<SetStateAction<{ [key: string]: unknown }>>;
  onChange?: (data: { [key: string]: unknown }) => void;
  document: Component;
  component: Component;
  modalState?:boolean;
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
    console.log(component)
    addFormData({ children: component.options.children });
    const schemas = getSchema(component.type);
    if (schemas?.length) {
      setInputs(
        schemas?.map(({ options: data, type }, i) => {
          // TODO: Optimizar
          setOptions(["Configuración"]);
          setOption("Configuración");
          if (type === "children") {
            if (schemas.length === 1) {
              setOptions(["Hijos"]);
              setOption("Hijos");
            } else setOptions(["Configuración", "Hijos"]);
          }
          if (!options.length) setOptions(["Configuración"]);
          const value = component.options[data.key];
          return (
            <DynamicInput
              key={"input-" + i}
              attrs={{
                ...data,
                dataKey: data?.key,
                value,
                parentId: component.id,
                onChange: addFormData,
                name: data.label,
              }}
              name={type as string}
            />
          );
        })
      );
    }
  }, [modalState, component.options, component.type]);

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
          <Children
            document={document}
            onChange={addFormData}
            parentId={component?.id as string}
            value={values.children}
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
                  console.log(setModalState)
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
