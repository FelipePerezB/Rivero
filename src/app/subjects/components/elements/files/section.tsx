import { ReactNode } from "react";
import DynamicElement from "./dynamic-file";
import Button from "@components/common/buttons/button/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightLong } from "@fortawesome/free-solid-svg-icons";

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
  console.log(number);
  return (
    <div
      className={`flex justify-center bg-white p-[1em] sm:p-[2em] print:p-0 w-full ${
        !options?.lastPage ? "break-after-page" : ""
      } }`}
      data-component={id}
      id={"page-" + number}
    >
      <div className="w-full flex flex-col h-full gap-[0.6em] max-w-4xl print:max-w-none">
        {children}
        {options?.children?.map((child, i) => (
          <DynamicElement
            key={`page-${number}-${child.type}-${i}`}
            attrs={{ ...child, number: i + 1 }}
            name={child.type}
          />
        ))}
      </div>
    </div>
  );
}
