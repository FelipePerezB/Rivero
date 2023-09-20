import React, { ReactNode, useState } from "react";
import Navar from "./Navar";
import Sidevar from "./Sidevar";
import Head from "next/head";
import { Toaster } from "react-hot-toast";

export default function Layout({
  children,
  className,
  title,
  navBtns,
}: {
  navBtns?: ReactNode[];
  className?: string;
  children?: ReactNode;
  style?: "only-nav";
  title?: string | ReactNode;
}) {
  const [visibility, setVisibility] = useState(false);
  return (
    <div className={`${className} min-h-[100dvh]`}>
      <Head>{title && <title>{`${title} | Rivero`}</title>}</Head>
      <Navar {...{ navBtns, title, setVisibility }} />
      <main className="flex justify-center items-centre flex-col gap-4 p-4 pt-16 mx-auto max-w-md text-slate-800">
        {children}
      </main>
      <Sidevar visibility={visibility} setVisibility={setVisibility} />
      {/* <Var state={style} /> */}
      <Toaster />
    </div>
  );
}
