import Link from "next/link";
import { ReactNode } from "react";

export type ButtonAttrs = {
  color?: "blue" | "white" | "red" | "black" | "transparent";
  children?: ReactNode;
  onClick?: any;
  size?: "sm" | "lg" | "xs";
  href?: string;
  className?: string;
};

export default function Button({
  children,
  onClick,
  color = "blue",
  size = "sm",
  href,
  className = "",
}: ButtonAttrs) {
  const colorVariants = {
    blue: "bg-blue-500 hover:bg-blue-400 text-white shadow-blue-500/40",
    red: "bg-rose-500 hover:bg-rose-400 text-white shadow-rose-500/30",
    white: "bg-white hover:bg-gray-100 text-black border shadow-gray-500/10",
    black: "bg-black hover:bg-gray-900 text-white border shadow-gray-500/10",
    transparent: "shadow-none hover:text-slate-500",
  };

  const sizeVariants = {
    xs: "w-max px-2 text-sm",
    sm: "w-max px-2.5 py-1 text-sm",
    lg: "w-5/6 py-1.5 my-0 mx-auto max-w-sm text-md",
  };

  className += ` ${colorVariants[color]} ${sizeVariants[size]} shadow-md rounded-md cursor-pointer hover:scale-95 transition-all duration-150 flex justify-center items-center gap-2`;

  return !href ? (
    <button type="button" onClick={onClick} className={className}>
      {children}
    </button>
  ) : (
    <Link className={`${className}`} href={href}>
      {children}
    </Link>
  );
}
