import GetComponent from "@components/create-components/edit-document/get-component";
import Title from "./title";
import capFirst from "src/utils/capFirst";
const DocumentHeader = ({ title = "" }: { title: string }) => {
  return (
    <div className=" pb-[0.4em] border-b mb-[0.6em]">
      <span className="flex gap-[0.3em]  rounded text-blue-500 print:text-gray-300">
        <span className="font-bold">Rivero</span>
        <span>|</span>
        <span className="font-bold">Matemática</span>
      </span>
      <Title options={{ size: "h1", text: capFirst(title) }} />
    </div>
  );
};

export default function Page({
  options: { children, number, lastPage } = {
    children: [{ options: {}, type: "" }],
    number: 1,
    lastPage: false,
  },
  document: { title } = { title: "" },
  id,
}: {
  document: {
    title: string;
  };
  type: string;
  id: string;
  options: {
    lastPage: boolean;
    number: number;
    children: {
      options: any;
      type: string;
    }[];
  };
}) {
  return (
    <div
      className={`bg-white border p-[1.6em] aspect-[210/297] w-full shadow-md hover:shadow-xl print:shadow-none ${
        !lastPage ? "break-after-page" : ""
      } }`}
      data-component={id}
      id={"page-" + number}
    >
      <div className="relative flex flex-col h-full gap-[0.1em]">
        {number === 1 && <DocumentHeader {...{ title }} />}
        {children?.map((child, i) => (
          <GetComponent
            key={`page-${number}-${child.type}-${i}`}
            attrs={child}
            name={child.type}
            folder="documents"
          />
        ))}
        <span className="absolute font-light text-[0.8em] bottom-0 right-0">
          {number}
        </span>
      </div>
    </div>
  );
}
