import React, { ReactNode, useState } from "react";
import Navar from "./Navar";
import Sidevar from "./Sidevar";
import Head from "next/head";
import { Toaster } from "react-hot-toast";

export default function Layout({
  children,
  style,
  className,
  title,
}: {
  className?: string;
  children?: ReactNode;
  style?: "only-nav";
  title?: string;
}) {
  const [visibility, setVisibility] = useState(false);
  return (
    <div className={`${className}`}>
      <Head>{title && <title>{`${title} | Rivero`}</title>}</Head>
      <Navar title={title} setVisibility={setVisibility} />
      <main className="flex justify-center items-centre flex-col gap-3 p-4 pt-14 mx-auto max-w-md text-slate-800">{children}</main>
      {/* <Var state={style} /> */}
      <Sidevar visibility={visibility} setVisibility={setVisibility} />
      <Toaster/>
    </div>
  );
}
