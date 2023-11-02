import React, { ReactNode } from "react";

export default function TagsInput({
  tags,
  group,
  onChange,
}: {
  group: string;
  tags: { value: string; node?: ReactNode | string }[];
  onChange: (tag: string) => void;
}) {
  return (
    <form className="flex gap-3 items-center w-full">
      {tags.map(({ value, node }, i) => (
        <label className="relative" key={`${group}-${i}`}>
          <input
            onChange={() => onChange(value)}
            name={group}
            type="radio"
            className="cursor-pointer absolute h-full w-full opacity-0 peer"
          />
          <div className="px-1.5 py-1 rounded items-center justify-center p-1 cursor-pointer peer-hover:bg-gray-100 peer-checked:outline-gray-200 peer-checked:shadow peer-checked:outline peer-checked:outline-1 transition-all duration-150">
            {node ?? value}
          </div>
        </label>
      ))}
    </form>
  );
}
