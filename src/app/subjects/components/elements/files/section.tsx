import { ReactNode } from "react";
import DynamicElement from "./dynamic-file";
import Title from "./title";
import capFirst from "src/utils/capFirst";

export default function Section({
  options,
  id,
  children,
  number,
}: {
  type?: string;
  id?: string;
  children?: ReactNode;
  number?: number;
  options?: {
    lastPage: boolean;
    children: {
      options: any;
      type: string;
    }[];
  };
}) {
  return (
    <div
      className={`bg-white border p-[1.6em] aspect-[210/297] w-full shadow-md hover:shadow-xl print:shadow-none ${
        !options?.lastPage ? "break-after-page" : ""
      } }`}
      data-component={id}
      id={"page-" + number}
    >
      <div className="relative flex flex-col h-full gap-[0.1em]">
        {children}
        {options?.children?.map((child, i) => (
          <DynamicElement
            key={`page-${number}-${child.type}-${i}`}
            attrs={{ ...child, number: i + 1 }}
            name={child.type}
          />
        ))}
        <span className="absolute font-light text-[0.8em] bottom-0 right-0">
          {number}
        </span>
      </div>
    </div>
  );
}
