import React, { ReactNode } from "react";

export default function ShapeContainer({
  children,
  id,
  isPreview,
}: {
  children: ReactNode;
  isPreview?: boolean;
  id: string;
}) {
  return isPreview ? (
    <svg height={100} width={100} overflow={"visible"}>
      {children}
    </svg>
  ) : (
    <g data-component={id}>{children}</g>
  );
}
