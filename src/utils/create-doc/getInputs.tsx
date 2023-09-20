import { Component } from "src/pages/docs/edit/[id]";
import getSchema from "./getSchema";
import GetComponent from "@components/create-components/edit-document/get-component";

const getInputs = (
  type: string,
  attrs: Component,
  onChange: (data: { [key: string]: unknown }) => void,
  showChildren?: boolean
) => {
  const schemas = getSchema(type);
  if (schemas?.length) {
    return schemas?.map(({ options, type }, i) => {
      const value = attrs?.options[options.key];
      return (
        <GetComponent
          key={"input-" + i}
          attrs={{
            ...options,
            dataKey: options?.key,
            value,
            parentId: attrs.id,
            onChange,
          }}
          folder="inputs"
          name={type as string}
        />
      );
    });
  }
};

export default getInputs;
