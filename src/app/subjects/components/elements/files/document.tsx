import capFirst from "src/utils/capFirst";
import Section from "./section";
import Title from "./title";
import FileContainer from "../../layout/file-container/file-container";
import { Component } from "src/app/documents/edit/models/component";

// const DocumentHeader = ({ name = "" }: { name: string }) => {
//   return (
//     <div className="flex flex-col items-center py-[1.2em] border-b-[0.15em] border-t-[0.15em] border-black mb-[1em] text-em leading-normal">
//       <Title options={{ size: "h1", text: capFirst(name) }} />
//       <span className="flex gap-[0.3em] text-gray-600 rounde">
//         <span className="font-bold">-- Rivero --</span>
//       </span>
//     </div>
//   );
// };
export default function Document({
  name,
  options,
  searchParams,
  id,
}: {
  searchParams: { [key: string]: string };
  name: string;
  type: string;
  options?: {
    children: Component[];
  };
  id: string;
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
  // console.log(sections);
  return (
    <FileContainer id={id}>
      {options?.children?.map((child, i) => {
        return (
          <Section
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
