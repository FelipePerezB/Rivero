import GetComponent from "@components/create-components/edit-document/get-component";
import React from "react";

export default function Box({
  id,
  options: { children, separator } = {
    children: [{ options: { text: "AA", size: "h1" }, type: "title" }],
    separator: "",
  },
}: {
  id: string;
  options: {
    separator?: string;
    children: {
      options: any;
      type: string;
    }[];
  };
}) {
  return (
    <div className="p-[0.6em] items-center flex gap-[0.6em]" data-component={id}>
      {children?.map((child, i) => (
        <>
          {i !== 0 && separator && <span>{separator}</span>}
          <GetComponent
            key={`child-${id}-${child.type}-${i}`}
            attrs={child}
            name={child.type}
            folder="documents"
          />
        </>
      ))}
    </div>
  );
}
