import React, { ReactNode } from "react";

export default function Button({
  // text,
  children,
  style = "primary",
  onClick,
}: {
  children: ReactNode
  style?: string;
  onClick?: any;
}) {
  return (
    <div>A</div>
  );
}
