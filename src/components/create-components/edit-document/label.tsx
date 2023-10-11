import React, { ReactNode } from "react";
import capFirst from "src/utils/capFirst";

export default function Label({
  name,
  dataKey,
  className,
  children,
}: {
  name: string;
  dataKey?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <label className={`w-full mx-auto ${className}`} htmlFor={dataKey ?? name}>
      {name && <span>{capFirst(name)}</span>}
      {children}
    </label>
  );
}
