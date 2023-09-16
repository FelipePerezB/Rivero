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
      className="flex justify-center items-center rounded-full p-2 hover:bg-gray-100"
    >
      {children}
    </button>
  );
}
