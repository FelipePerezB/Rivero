import React, { ReactNode } from "react";

export default function CircleButton({
  children,
  onClick,
}: {
  children?: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      onClick={onClick}
      className="relative flex justify-center items-center p-3 hover:bg-slate-100 rounded-full"
    >
      <div className="absolute rounded-full">{children}</div>
    </button>
  );
}
