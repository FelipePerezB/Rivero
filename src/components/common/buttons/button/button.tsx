import Link from "next/link";
import { CSSProperties, ReactNode } from "react";

export type ButtonAttrs = {
  type?: "button" | "submit" | "reset";
  prefetch?: boolean;
  color?: "blue" | "white" | "red" | "black" | "transparent";
  children?: ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  size?: "sm" | "lg" | "xs" | "square";
  href?: string;
  className?: string;
  style?: CSSProperties;
  title?: string;
  isInactive?: boolean;
};

export default function Button({
  isInactive,
  type = "button",
  prefetch,
  children,
  onClick,
  color = "blue",
  size = "sm",
  style,
  href,
  className = "",
  title,
}: ButtonAttrs) {
  const colorVariants = {
    blue: `hover:bg-blue-400 text-white shadow-blue-500/40 ${
      !!isInactive ? "bg-blue-400" : "bg-blue-500"
    }`,
    red: `hover:bg-rose-400 text-white shadow-rose-500/30 ${
      !!isInactive ? "bg-rose-400" : "bg-rose-500"
    }`,
    white: `hover:bg-gray-100 text-black border shadow-gray-500/10 ${
      !!isInactive ? "bg-gray-100" : "bg-white"
    }`,
    black: `hover:bg-gray-900 text-white border shadow-gray-500/10 ${
      !!isInactive ? "bg-gray-900" : "bg-black"
    }`,
    // black: "bg-black hover:bg-gray-900 text-white border shadow-gray-500/10",
    transparent: "shadow-none hover:text-slate-500",
  };

  const sizeVariants = {
    xs: "shadow-none text-black text-xs",
    sm: "w-max px-2.5 py-1 text-sm",
    lg: "w-5/6 py-1.5 my-0 mx-auto max-w-sm text-md",
    square: "p-2 w-max aspect-square",
  };

  className += ` ${colorVariants[color]} ${
    sizeVariants[size]
  } shadow-md rounded-md cursor-pointer h-max w-max hover:scale-95 transition-all duration-150 flex justify-center items-center gap-2 ${
    !!isInactive && "scale-95"
  }`;

  return !href ? (
    <button
      style={style}
      title={title}
      type={type}
      onClick={onClick}
      className={className}
    >
      {children}
    </button>
  ) : (
    <Link
      style={style}
      prefetch={prefetch}
      title={title}
      className={`${className}`}
      href={href}
    >
      {children}
    </Link>
  );
}
