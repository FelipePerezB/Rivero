/* eslint-disable react-hooks/exhaustive-deps */
import Button from "@components/Button";
import Options from "@components/Options";
import Buttons from "@components/button/buttons/Buttons";
import React, { ReactNode, SetStateAction, useEffect, useState } from "react";
// import Children from "../../components/elements/inputs/children";
// import {
//   Component,
//   ComponentOptions,
// } from "src/app/subjects/edit/models/component";
// import { componentsNames } from "src/app/subjects/edit/utils/schemas";
import getSchema from "../utils/getSchema";
import FormChildren from "./children-form";
// import DynamicInput from "../../components/elements/inputs/dynamic-input";
import generateRandomId from "src/utils/generateRandomId";
import { IdLenght } from "src/models/document.model";
import OptionsInput from "@components/inputs/OptionsInput/OptionsInput";
import Preview from "./preview";
import { Component, ComponentOptions } from "../models/component";
import Children from "src/app/subjects/components/elements/inputs/children";
import DynamicInput from "src/app/subjects/components/elements/inputs/dynamic-input";
// import { componentsNames } from "../utils/schemas";
import SelectCategory from "./select-category";
import SelectComponent from "./select-component";
import specifics from "../utils/schemas/specifics";

type options = "Configuración" | "Hijos";

export default function Form({
  type,
  defaultValues,
  id,
  types,
  onDelete,
  onSave,
}: // onChange,
{
  types?: string[];
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
  const [childrenTypes, setChildrenTypes] = useState([]);
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
    console.log(schemas);
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
          if (type === "children") {
            setChildrenTypes(data?.types);
          }
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

  console.log(component);

  return (
    <div className="flex flex-col gap-2">
      {!type && (
        <>
          <SelectComponent types={types} setComponent={setComponent} />
          <hr className="py-1" />
        </>
      )}
      {type && type !== "section" && type !== "document" && (
        <Preview {...{ attrs: component }} />
      )}
      <Options {...{ option, setOption, options: options }} />
      {option === "Configuración" && <>{inputs?.map((input) => input)}</>}
      {option === "Hijos" && (
        <div>
          <FormChildren onChange={addFormData} {...{ children }} />
          <Children
            types={childrenTypes}
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
