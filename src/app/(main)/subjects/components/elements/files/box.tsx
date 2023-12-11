// import GetComponent from "@components/create-components/edit-document/get-component";
import React from "react";
import DynamicElement from "./dynamic-file";

export default function Box({
  id,
  options: { children, separator, direction, align, highlight } = {
    children: [{ options: { text: "Box", size: "h1" }, type: "title" }],
    separator: "",
    direction: "row",
    align: "start",
    highlight: false,
  },
}: {
  id: string;
  options: {
    direction: "row" | "column";
    align: "start" | "center" | "end";
    separator?: string;
    highlight: boolean;
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
    center: "mx-auto w-max justify-center items-center",
    around: "w-full items-center justify-around",
    start: "justify-start items-start w-max",
    end: "justify-end items-end",
  };

  return (
    <div
      className={`flex flex-wrap p-[0.6em] gap-[0.6em] rounded-sm ${
        directionTypes[direction]
      } ${alignTypes[align]} ${
        highlight ? "outline outline-black outline-[0.1em] my-[0.6em]" : ""
      }`}
      data-component={id}
    >
      {children?.map((child, i) => (
        <div className="flex gap-[0.6em] justify-center items-center" key={`child-${id}-${child.type}-${i}`}>
          {i !== 0 && separator && <span>{separator}</span>}
          <DynamicElement attrs={child} name={child.type} />
        </div>
      ))}
    </div>
  );
}
