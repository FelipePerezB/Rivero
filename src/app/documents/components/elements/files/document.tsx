"use client";
import Section from "./section";
export default function Document({
  type,
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
    <div
      id="document-container"
      data-component={id}
      className="flex flex-col gap-4 print:gap-0 text-[0.95em]"
    >
      {/* <p>AA</p> */}
      {options?.children?.map((child, i) => {
        console.log(child);
        return (
          <Section
            document={{ title }}
            id={child?.id as string}
            options={
              {
                ...child?.options,
                number: i + 1,
                lastPage: i + 1 === options?.children?.length,
              } as any
            }
            type="section"
            key={`doc-${id}-${i}`}
          />
          // <GetComponent
          //   key={`doc-${id}-${i}`}
          //   attrs={{
          //     ...child,
          //     document: {
          //       title,
          //     },
          //     options: {
          //       ...child?.options,
          //       number: i + 1,
          //       lastPage: i + 1 === options?.children?.length,
          //     },
          //   }}
          //   name={child?.type}
          //   folder="documents"
          // />
        );
      })}
    </div>
  );
}
