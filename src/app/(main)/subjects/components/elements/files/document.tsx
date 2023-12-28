import Section from "./section";
import FileContainer from "../../layout/file-container/file-container";
import { Component } from "src/app/documents/edit/models/component";
import { ReactNode } from "react";

export default function Document({
  documentId,
  metadata,
  options,
  children,
  // searchParams,
  id,
}: {
  children?: ReactNode;
  metadata?: { [key: string]: unknown };
  documentId?: string;
  // searchParams: { [key: string]: string };
  name?: string;
  type?: string;
  options?: {
    children: Component[];
  };
  id?: string;
}) {
   
  // const sections = options?.children.filter((section, i)=>i===sw)
  // const sections = options?.children
  //   ?.map((element) =>
  //     element?.options.children?.find(
  //       ({ type, options, id }) =>
  //         type === "title" && options.size === "h2" && id
  //     )
  //   )
  //   .map((title) => title?.options?.text);
  //  
  return (
    <FileContainer id={id}>
      {children}
      {options?.children?.map((child, i) => {
        return (
          <Section
            metadata={metadata}
            documentId={documentId}
            id={child?.id as string}
            number={i + 1}
            options={
              {
                ...child?.options,
                lastPage: i + 1 === options?.children?.length,
              } as any
            }
            type="section"
            key={`doc-${id}-${i}`}
          >
            {/* {i === 0 && <DocumentHeader {...{ name }} />} */}
          </Section>
        );
      })}
    </FileContainer>
  );
}
