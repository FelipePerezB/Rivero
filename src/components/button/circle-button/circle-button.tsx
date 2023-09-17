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
      className="relative flex justify-center items-center w-5 h-5 hover:text-slate-400/[0.9]"
    >
      <div className="absolute">{children}</div>
    </button>
  );
}
