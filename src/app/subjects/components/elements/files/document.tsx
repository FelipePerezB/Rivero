import capFirst from "src/utils/capFirst";
import Section from "./section";
import Title from "./title";
import FileContainer from "../../layout/file-container/file-container";

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
  id,
}: {
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
      {options?.children?.map((child, i) => {
        return (
          <Section
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
          >
            {/* {i === 0 && <DocumentHeader {...{ name }} />} */}
          </Section>
        );
      })}
    </FileContainer>
  );
}
