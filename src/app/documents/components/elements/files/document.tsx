import capFirst from "src/utils/capFirst";
import Section from "./section";
import Title from "./title";
import FileContainer from "../../layout/file-container/file-container";

const DocumentHeader = ({ title = "" }: { title: string }) => {
  return (
    <div className="flex flex-col items-center pb-[1em] border-b-[0.1em] mb-[0.6em] text-em leading-normal">
      <Title options={{ size: "h1", text: capFirst(title) }} />
      <span className="flex gap-[0.3em] text-gray-500 rounded print:text-gray-300">
        <span className="font-bold">-- A --</span>
      </span>
    </div>
  );
};
export default function Document({
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
            {i === 0 && <DocumentHeader {...{ title }} />}
          </Section>
        );
      })}
    </FileContainer>
  );
}
