/* eslint-disable react-hooks/exhaustive-deps */
import { CSSProperties, ReactNode } from "react";
import Link from "next/link";

export default function Card({
  children,
  href,
  className,
  interactive = false,
  styles,
  // size = "lg",
}: {
  styles?: CSSProperties,
  // size?: "lg" | "sm";
  className?: string;
  styled?: boolean;
  children?: ReactNode;
  href?: string;
  interactive?: boolean;
}) {
  // const sizeVariants = {
  //   lg: "w-full",
  //   sm: "w-max",
  // };

  const nodeClassName = `${className} w-full sm:w-max bg-white p-2.5 rounded-md shadow-gray-100 shadow text-slate-800 border border-gray-250  ${
    interactive
      ? "cursor-pointer hover:scale-[0.975] transition-all duration-200"
      : "duration-100"
  }  `;


  return href ? (
    <Link style={styles} className={nodeClassName} href={href}>
      {children}
    </Link>
  ) : (
    <article style={styles} className={nodeClassName}>{children}</article>
  );
}
