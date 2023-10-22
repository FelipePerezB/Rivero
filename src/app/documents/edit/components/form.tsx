/* eslint-disable react-hooks/exhaustive-deps */
import Button from "@components/Button";
import Options from "@components/Options";
import Buttons from "@components/button/buttons/Buttons";
import React, { ReactNode, SetStateAction, useEffect, useState } from "react";
import Children from "../../components/elements/inputs/children";
import {
  Component,
  ComponentOptions,
} from "src/app/documents/edit/models/component";
import { componentsNames } from "src/app/documents/edit/utils/schemas";
import getSchema from "../utils/getSchema";
import FormChildren from "./children-form";
import DynamicInput from "../../components/elements/inputs/dynamic-input";
import generateRandomId from "src/utils/generateRandomId";
import { IdLenght } from "src/models/document.model";
import OptionsInput from "@components/inputs/OptionsInput/OptionsInput";
import Preview from "./preview";

type options = "Configuración" | "Hijos";

export default function Form({
  type,
  defaultValues,
  id,
  modalState,
  onDelete,
  onSave,
}: // onChange,
{
  // onChange?: (data: { [key: string]: unknown }) => void;
  type?: string;
  defaultValues: ComponentOptions;
  id?: string;
  modalState?: boolean;
  setModalState?: React.Dispatch<SetStateAction<boolean>>;
  onSave?: (props: Component) => void;
  onDelete?: (props: Component) => void;
}) {
  const [inputs, setInputs] = useState<ReactNode[] | undefined>([]);
  const [options, setOptions] = useState<string[]>([]);
  const [option, setOption] = useState<options | undefined>("Configuración");

  const [component, setComponent] = useState({
    type: type ?? "",
    options: defaultValues,
    id: id ?? generateRandomId(IdLenght.sm),
  });
  const addFormData = (newData: { [key: string]: unknown }) => {
    setComponent((component) => ({
      ...component,
      options: { ...component.options, ...newData },
    }));
  };

  useEffect(() => {
    setComponent((component) => ({
      ...component,
      id: id ?? "",
      type: type ?? component.type,
      options: { ...defaultValues },
    }));
  }, [defaultValues]);

  const children = component.options.children;
  useEffect(() => {
    if (!component.type) return;
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
          const value = defaultValues[data.key];
          return (
            <DynamicInput
              key={"input-" + i}
              attrs={{
                ...data,
                dataKey: data?.key,
                value,
                parentId: id,
                onChange: addFormData,
                name: data.label,
              }}
              name={type}
            />
          );
        })
      );
    }
  }, [component.type, defaultValues]);

  return (
    <div className="flex flex-col gap-2">
      {!type && (
        <OptionsInput
          name="Tipo de componente"
          dataKey="type"
          value={type}
          onChange={({ type }) => {
            const isValid = componentsNames.includes(type);
            if (!isValid) return;
            setComponent((props) => ({ ...props, type }));
          }}
          options={componentsNames}
        />
      )}
      {component.type && component.type !== "section" && (
        <Preview {...{ attrs: component }} />
      )}
      <Options {...{ option, setOption, options: options }} />
      {option === "Configuración" && <>{inputs?.map((input) => input)}</>}
      {option === "Hijos" && (
        <div>
          <FormChildren
            onChange={addFormData}
            {...{
              // onChange: addFormData,
              parentId: id,
              children,
            }}
          />
          <Children
            value={children}
            onChange={addFormData}
            parentId={id as string}
          />
        </div>
      )}
      <div className="mt-2">
        <Buttons>
          {onSave && component.type && (
            <Button
              onClick={() => {
                onSave(component);
              }}
              color="blue"
            >
              Guardar
            </Button>
          )}
          {onDelete && (
            <Button
              onClick={() => {
                id && type && onDelete(component);
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
