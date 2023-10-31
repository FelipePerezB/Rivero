// import GetComponent from "@components/create-components/edit-document/get-component";
import React from "react";
import DynamicElement from "./dynamic-file";

export default function Box({
  id,
  options: { children, separator, direction, align } = {
    children: [{ options: { text: "AhuihiA", size: "h1" }, type: "title" }],
    separator: "",
    direction: "row",
    align: "start",
  },
}: {
  id: string;
  options: {
    direction: "row" | "column";
    align: "start" | "center" | "end";
    separator?: string;
    children: {
      options: any;
      type: string;
    }[];
  };
}) {
  const directionTypes = {
    column: "flex-col",
    row: "flex-row",
  };

  const alignTypes = {
    center: "justify-center items-center",
    start: "justify-start items-start",
    end: "justify-end items-end",
  };

  return (
    <div
      className={`p-[0.6em] gap-[0.6em] flex ${directionTypes[direction]} ${alignTypes[align]}`}
      data-component={id}
    >
      {children?.map((child, i) => (
        <>
          {i !== 0 && separator && <span>{separator}</span>}
          <DynamicElement
            key={`child-${id}-${child.type}-${i}`}
            attrs={child}
            name={child.type}
          />
        </>
      ))}
    </div>
  );
}
