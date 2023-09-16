/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode } from "react";
import Link from "next/link";

export default function Card({
  children,
  href,
  className = "",
  interactive = false,
}: {
  className?: string;
  styled?: boolean;
  children?: ReactNode;
  href?: string;
  interactive?: boolean;
}) {
  const Card = (
    <section
      className={`bg-white p-2.5 rounded-sm shadow text-slate-800 border-[1px] border-gray-100 ${
        interactive
          ? "cursor-pointer hover:scale-105 hover:bg-gray-50 transition-all duration-300"
          : ""
      }`}
    >
      {children}
    </section>
  );
  return href ? <Link href={href}>{Card}</Link> : Card;
}
