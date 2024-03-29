import Link from "next/link";
import React from "react";
export default function Options({
  options,
  option,
  customPath,
}: // setOption,
{
  customPath?: string;
  options?: {
    key: string | number;
    title: string;
  }[];
  option?: string;
  // setOption: any;
}) {
  return options && options?.length > 1 ? (
    <div className="overflow-x-auto h-max sm:w-full pt-0.5 sm:mx-auto w-full">
      <ul className="flex gap-4 w-1/2">
        {options?.map(({ key, title }, i) => {
          const isActive =
            String(key)?.toLowerCase() === option?.toLowerCase() ||
            (!option && i === 0);
          return (
            <Link
              key={"option-" + key}
              href={
                !customPath
                  ? String(key)?.toLowerCase()
                  : customPath.replace("[key]", String(key))
              }
            >
              <li
                className={`cursor-pointer py-0.5 mb-1 px-2 flex-shrink-0  hover:text-slate-800  w-max  ${
                  isActive
                    ? "text-slate-800 border-b-2 border-slate-800 font-medium"
                    : "font-light hover:font-normal"
                }`}
              >
                {title}
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  ) : (
    <></>
  );
}
