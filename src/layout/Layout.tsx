import React, { ReactNode, useState } from "react";
import Navar from "./Navar";
import styles from "@styles/Layout.module.css";
import Var from "./Var";
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
  children: ReactNode;
  style?: "only-nav";
  title?: string;
}) {
  const [visibility, setVisibility] = useState(false);
  return (
    <div className={`${styles.layout} ${className}`}>
      <Head>{title && <title>{`${title} | Rivero`}</title>}</Head>
      <Navar title={title} setVisibility={setVisibility} />
      <main className={styles.main}>{children}</main>
      {/* <Var state={style} /> */}
      <Sidevar visibility={visibility} setVisibility={setVisibility} />
      <Toaster/>
    </div>
  );
}
