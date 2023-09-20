import GetComponent from "@components/create-components/edit-document/get-component";
import React from "react";
import Title from "./title";

export default function excercises({
  id,
  options: { children } = {
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
  console.log(id)
  return (
    <section data-component={id}>
      <Title options={{size: "h2", text: "Práctica"}} />
      <div className="flex flex-col gap-[0.8em] pb-[0.6em]">
        {children?.map((child, i) =>{ 
          console.log(child)
          return (
          <GetComponent
            key={`child-${id}-${child.type}-${i}`}
            attrs={{ ...child, number: i + 1 }}
            name={child.type}
            folder="documents"
          />
        )})}
      </div>
    </section>
  );
}
