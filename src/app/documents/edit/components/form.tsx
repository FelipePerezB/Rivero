/* eslint-disable react-hooks/exhaustive-deps */
import Button from "@components/common/buttons/button/button";
import Buttons from "@components/common/buttons/buttons/Buttons";
import React, { ReactNode, SetStateAction, useEffect, useState } from "react";
import getSchema from "../utils/getSchema";
import FormChildren from "./children-form";
// import DynamicInput from "../../components/elements/inputs/dynamic-input";
import { IdLenght } from "src/models/document.model";
import Preview from "./preview";
import {
  Component,
  ComponentOptions,
  LessonWithComponent,
} from "../models/component";
import Children from "src/app/(main)/subjects/components/elements/inputs/children";
import DynamicInput from "src/app/(main)/subjects/components/elements/inputs/dynamic-input";
// import { componentsNames } from "../utils/schemas";
import SelectCategory from "./select-category";
import SelectComponent from "./select-component";
import specifics from "../utils/schemas/specifics";
import Options from "@components/common/options";
import generateRandomId from "src/utils/generateRandomId";
import TextAreaInput from "@components/form/TextAreaInput/text-area-input";
import { removeIdFromObject } from "../utils/removeId";
import { hydrateJSON } from "../utils/hydrateJSON";

const getOptimizedContent = (settings?: LessonWithComponent["file"]) => {
  if (!settings?.content || typeof settings?.content !== "object")
    return "Error al cargar el documento";
  const fileCopy = JSON.parse(JSON.stringify(settings?.content));
  const optimizedContent = JSON.stringify(removeIdFromObject(fileCopy));
  return optimizedContent;
};

type options = "Configuración" | "Hijos" | "Contenido";

export default function Form({
  type,
  defaultValues,
  id,
  types,
  onDelete,
  onSave,
}: {
  types?: string[];
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

  const [component, setComponent] = useState<Component>({
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
      setOptions(["Configuración", "Contenido"]);
      if (
        schemas.map(({ type }) => type).includes("children") &&
        !options.includes("Hijos")
      ) {
        setOptions([...options, "Hijos"]);
        schemas.length === 1 ? setOption("Hijos") : setOption("Configuración");
      } else {
        setOption("Configuración");
      }
      setInputs(
        schemas?.map(({ options: data, type }, i) => {
          const value = defaultValues[data?.key];
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
            types={types}
            value={children}
            onChange={addFormData}
            parentId={id as string}
          />
        </div>
      )}
      {option === "Contenido" && onSave && (
        <TextAreaInput
          name="code"
          label="Contenido"
          value={getOptimizedContent({ content: component })}
          onBlur={(content) => {
            console.log(content);
            console.log(
              hydrateJSON(
                JSON.parse(content),
                id?.substring(0, id.length - IdLenght.sm - 1)
              )
            );
            console.log(component);
            // setComponent(hydrateJSON(JSON.parse(content)));
            setComponent(
              hydrateJSON(
                JSON.parse(content),
                id?.substring(0, id.length - IdLenght.sm - 1)
              )
            );
          }}
        />
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
