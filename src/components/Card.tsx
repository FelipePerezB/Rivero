/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode } from "react";
import Link from "next/link";

export default function Card({
  children,
  href,
  className,
  interactive = false,
  size = "lg",
}: {
  size?: "lg" | "sm";
  className?: string;
  styled?: boolean;
  children?: ReactNode;
  href?: string;
  interactive?: boolean;
}) {
  const sizeVariants = {
    lg: "w-full",
    sm: "w-max",
  };

  const styles = `${sizeVariants[size]} ${className} bg-white p-2.5 rounded-sm shadow-gray-300/30 shadow-lg text-slate-800 border border-gray-200  ${
    interactive
      ? "cursor-pointer hover:shadow-xl transition-all duration-300"
      : ""
  }  `;


  return href ? (
    <Link className={styles} href={href}>
      {children}
    </Link>
  ) : (
    <article className={styles}>{children}</article>
  );
}
