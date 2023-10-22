import React, { ReactNode } from "react";
import capFirst from "src/utils/capFirst";

export default function Label({
  name,
  dataKey,
  className,
  children,
  align = "left",
}: {
  align?: "left" | "center";
  name: string;
  dataKey?: string;
  className?: string;
  children: ReactNode;
}) {
  const alignVariants = {
    left: "",
    center: "mx-auto",
  };
  return (
    <label className={`flex flex-col w-full mx-auto ${className}`} htmlFor={dataKey ?? name}>
      {name && (
        <span className={`${alignVariants[align]}`}>{capFirst(name)}</span>
      )}
      {children}
    </label>
  );
}
