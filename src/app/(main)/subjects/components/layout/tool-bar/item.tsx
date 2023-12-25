import React, { ReactNode } from "react";

export default function Item({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <div className="cursor-pointer flex items-center gap-1.5">
      <div title={title}>{children}</div>
      <span className="hidden md:inline-block">{title}</span>
    </div>
  );
}
