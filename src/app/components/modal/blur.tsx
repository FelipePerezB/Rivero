import Link from "next/link";
import React from "react";

export default function Blur({
  show,
}: {
  show: boolean;
}) {
  return (
    <Link
      href={'?'}
      className={`cursor-default fixed z-40 top-0 left-0 opacity-0 h-full w-full bg-slate-900/50 transition-all duration-500
    ${show ? "opacity-100" : "animate-hide"}`}
    ></Link>
  );
}
