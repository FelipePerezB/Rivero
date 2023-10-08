"use client";
import { schemas } from "@components/create-components/utils/schemas";
import { Dispatch, ReactNode, RefObject, SetStateAction, useEffect, useState } from "react";
// import { getDefaultFile } from "src/app/documents/edit/[id]/page";
import Sidebar from "src/app/documents/edit/components/edit-sidebar";
// import { Component } from "src/pages/docs/edit/[id]";
import getNode from "src/utils/create-doc/getNode";
import { hydrateJSON } from "src/utils/create-doc/hydrate.JSON";
import iterateObj from "src/utils/create-doc/iterateObject";
import GetComponente from "./components/get-component";
import { File } from "@prisma/client";
// import GetComponent from "@components/create-components/edit-document/get-component";
export interface ComponentOptions {
  children?: ComponentObj[];
  [key: string]: unknown;
}

export interface ComponentObj {
  type: string;
  id?: string;
  options: ComponentOptions;
}

export default function EditWraper({
  file,
  setFile,
  fileRef,
  id,
}: {
  fileRef: RefObject<HTMLDivElement>;
  setFile: Dispatch<SetStateAction<ComponentObj>>;
  file: ComponentObj;
  id: string;
  // children: ReactNode;
}) {
  const [values, setValues] = useState<{ [key: string]: unknown }>({});
  const [componentId, setComponentId] = useState<string>("");
  const [state, setState] = useState(false);
  const [inputs, setInputs] = useState<ReactNode>(null);

  let component: ComponentObj | undefined;
  const onChange = (data: { [key: string]: string }) =>
    setValues({ ...values, ...data });

  const onSave = () => {
    iterateObj(componentId, file, (component) => {
      component.options = {
        ...component.options,
        ...values,
      };
      setFile({ ...file });
      setState(false);
    });
  };

  useEffect(() => {
    console.log(fileRef);
    if (!fileRef?.current) return;
    fileRef.current.onclick = (event) => {
      const node = getNode(event.target as HTMLElement);
      if (!node) return;
      const id = node?.dataset.component;
      if (!id) return;
      iterateObj(id, file, (data) => {
        if (data.id) component = data;
      });
      const type = component?.type;
      setComponentId(id);
      if (!type) return;
      const schema = schemas[type] as ComponentObj[];
      console.log(onChange);
      setInputs(
        <div>
          {schema?.map(({ type, options }, i) => (
            <GetComponente
              key={"input-" + i}
              folder="inputs"
              attrs={{
                ...options,
                dataKey: options?.key,
                name: options?.label,
                onChange,
              }}
              name={type}
            />
          ))}
        </div>
      );
      setState(true);
    };
  }, [fileRef?.current]);

  return (
    <>
      <Sidebar onSave={onSave} setSidebarState={setState} sidebarState={state}>
        {inputs}
      </Sidebar>
    </>
  );
}
