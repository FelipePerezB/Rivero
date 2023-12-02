"use client";
import Blur from "@components/common/blur";
import { ReactNode } from "react";
// import Blur from "../common/blur";

export default function Sidebar({
  children,
  CloseWrapper,
  show,
}: {
  children: ReactNode;
  show: boolean;
  CloseWrapper: React.FC<{ children: ReactNode }>;
}) {
  return (
    <div className="top-0 left-0 h-full fixed flex justify-start items-start z-40 p-6">
      <Blur CloseWrapper={CloseWrapper} show={show} />
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
