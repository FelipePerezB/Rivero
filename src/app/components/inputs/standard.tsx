import React from "react";
import capFirst from "src/utils/capFirst";

export default function StandardInput({
  label,
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <label className={`w-full mx-auto ${className}`}>
      {label && <span>{capFirst(label)}</span>}
      <input
        className="p-2 my-1 text-sm text-slate-700 card w-full focus:mb-0.5 focus:border-2 focus:border-blue-500 focus:outline-none focus:shadow focus:shadow-blue-500/10"
        placeholder="AA"
      />
    </label>
  );
}
