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
  return options && options?.length > 1 ? (
    <div className="w-full mx-auto my-0 overflow-x-scroll py-3">
      <ul className="flex gap-4 w-1/2">
        {options?.map((opt) => {
          const isActive = opt?.toLowerCase() === option?.toLowerCase();
          return (
            <li
              className={`cursor-pointer py-0.5 px-2 flex-shrink-0 font-semibold ${
                isActive
                  ? "text-slate-800 border-b-2 border-slate-800"
                  : "text-slate-500"
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
