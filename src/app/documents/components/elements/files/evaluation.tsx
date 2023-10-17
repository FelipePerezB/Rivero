import React from "react";
import Section from "./section";
import Title from "./title";
import FileContainer from "../../layout/file-container/file-container";

export default function Evaluation({
  title,
  options,
  id,
}: {
  title: string;
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
      <Section number={1}>
        <div className="py-8 flex justify-center">
          <Title type="title" options={{ size: "h1", text: title }} />
        </div>
      </Section>
      {options?.children?.map((child, i) => {
        return (
          <Section
            id={child?.id as string}
            number={i + 2}
            options={
              {
                ...child?.options,
                lastPage: i + 2 === options?.children?.length,
              } as any
            }
            type="section"
            key={`doc-${id}-${i}`}
          />
        );
      })}
    </FileContainer>
  );
}
