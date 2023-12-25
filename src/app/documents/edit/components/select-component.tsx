import React, { useState } from "react";
import schemas from "../utils/schemas/global";
import DynamicElement from "src/app/(main)/subjects/components/elements/files/dynamic-file";
import { ComponentOptions } from "../models/component";
import TagsInput from "@components/form/tags/tags-input";import capFirst from "src/utils/capFirst";

export default function SelectComponent({
  types,
  setComponent,
}: {
  types?: string[];
  setComponent: React.Dispatch<
    React.SetStateAction<{
      type: string;
      options: ComponentOptions;
      id: string;
    }>
  >;
}) {
  const globalsSchemas = schemas as any; // Perdoname Dios
  const categories = Object.keys(globalsSchemas);

  // const newNames = types?.map((type) => specifics[type]);

  // console.log(newNames);
  const [category, setCategory] = useState("");
  const names = types?.length
    ? types
    : globalsSchemas[category] && Object.keys(globalsSchemas[category]);
  return (
    <>
      {!types?.length && (
        <TagsInput
          group="selected-category"
          onChange={setCategory}
          tags={categories?.map((name) => ({
            value: name,
            node: capFirst(name),
          }))}
        />
      )}
      {!!names && (
        <TagsInput
          group={`selected-element-${category}`}
          onChange={(type) =>
            setComponent((component) => ({ ...component, type }))
          }
          tags={names?.map((name: string) => ({
            value: name,
            node: (
              <div className="text-[0.5em]">
                <DynamicElement attrs={{}} name={name} />
              </div>
            ),
          }))}
        />
      )}
    </>
  );
}
