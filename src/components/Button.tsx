import { ReactNode } from "react";

export type ButtonAttrs = {
  color?: "blue" | "red" | "white" | "black";
  children?: ReactNode;
  style?: "primary" | "secondary" | "small-active" | "small";
  onClick?: any;
  size?: "sm" | "lg";
};

export default function Button({
  children,
  onClick,
  color = "blue",
  size = "sm",
}: ButtonAttrs) {
  const colorVariants = {
    blue: "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-300",
    red: "bg-red-500 hover:bg-red-400 text-white shadow-red-300",
    white: "bg-white hover:bg-gray-100 text-black border",
    black: "bg-black hover:bg-gray-900 text-white border",
  };

  const sizeVariants = {
    sm: "w-max px-4 py-1",
    lg: "w-5/6 py-1.5 my-0 mx-auto",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${colorVariants[color]} ${sizeVariants[size]} shadow-sm  rounded-md cursor-pointer hover:scale-95 transition-all duration-150`}
    >
      {children}
    </button>
  );
}
