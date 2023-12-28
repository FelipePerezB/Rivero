import React from "react";
export default function Options({
  options,
  option,
  setOption,
}: {
  options?: string[];
  option?: string;
  setOption: any;
}) {
  console.log(options)
  return options && options?.length > 1 ? (
    <div className="w-full mx-auto overflow-x-scroll sm:overflow-x-hidden pb-3 pt-0.5">
      <ul className="flex gap-4 w-1/2">
        {options?.map((opt) => {
          const isActive = opt?.toLowerCase() === option?.toLowerCase();
          return (
            <li
              className={`cursor-pointer py-0.5 px-2 flex-shrink-0 font-semibold hover:text-slate-900 ${
                isActive
                  ? "text-slate-800 border-b-2 border-slate-800"
                  : ""
              }`}
              onClick={() => setOption(opt)}
              key={opt}
            >
              {opt}
            </li>
          );
        })}
      </ul>
    </div>
  ) : (
    <></>
  );
}
