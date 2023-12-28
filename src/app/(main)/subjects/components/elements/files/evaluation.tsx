import React from "react";
import Section from "./section";
import Title from "./title";
import FileContainer from "../../layout/file-container/file-container";
import DynamicElement from "./dynamic-file";
import Header from "./header";

export default function Evaluation({
  documentId,
  name,
  options,
  id,
}: {
  documentId: string,
  name: string;
  type: string;
  options?: {
    children?: {
      type: string;
      id?: string;
      options: { [key: string]: unknown };
    }[];
  };
  id: string;
}) {

  return (
    <FileContainer id={id}>
      <Section  number={1}>
        <div className="flex justify-center">
          <Header options={{ title: name,  subtitle: "Ensayo PAES"}} />
        </div>
        {options?.children?.map((child, i) => (
          <DynamicElement
            key={`page-${2}-${child.type}-${i}`}
            attrs={{ ...child, number: i + 1, documentId }}
            name={child.type}
          />
        ))}
      </Section>
    </FileContainer>
  );
}
