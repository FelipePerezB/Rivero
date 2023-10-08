"use client";
import React, { ReactNode } from "react";
// import Blur from "./blur";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const Blur = ({ show }: { show: boolean }) => (
  <Link
    key={"blur"}
    href={"?"}
    className={`cursor-default fixed z-40 top-0 left-0 opacity-0 h-full w-full bg-slate-900/50 transition-all duration-500
  ${show ? "opacity-100" : "animate-hide"}`}
  ></Link>
);

export default function Sidebar({
  sidebarKey = "sidebar",
  id,
  children,
}: {
  children: ReactNode;
  sidebarKey?: string;
  id: string;
}) {
  const sidebarId = useSearchParams()?.get(sidebarKey);
  const show = sidebarId === id;
  return (
    <div className="top-0 left-0 h-full fixed flex justify-start items-start z-40 p-6">
      <Blur show={show} />
      <article
        className={`fixed z-40 h-full w-80 bg-white rounded-md transition-all duration-[400ms] p-4 ${
          show ? "translate-x-0" : "translate-x-[-400px]"
        }`}
      >
        {children}
      </article>
    </div>
  );
}
