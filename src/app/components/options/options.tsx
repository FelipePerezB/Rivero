import Link from "next/link";
import React from "react";
export default function Options({
  options,
  option,
}: // setOption,
{
  options?: {
    key: string | number;
    title: string;
  }[];
  option?: string;
  // setOption: any;
}) {
  return options && options?.length > 1 ? (
    <div className="overflow-x-scroll sm:w-full sm:overflow-x-hidden pb-3 pt-0.5 sm:mx-auto sm:">
      <ul className="flex gap-4 w-1/2">
        {options?.map(({ key, title }, i) => {
          const isActive =
            String(key)?.toLowerCase() === option?.toLowerCase() ||
            (!option && i === 0);
          return (
            <Link key={"option-" + key} href={String(key)}>
              <li
                className={`cursor-pointer py-0.5 px-2 flex-shrink-0 font-semibold hover:text-slate-800 ${
                  isActive
                    ? "text-slate-800 border-b-2 border-slate-800"
                    : "text-slate-500"
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
