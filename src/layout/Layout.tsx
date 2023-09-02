import React, { ReactNode, useState } from "react";
import Navar from "./Navar";
import styles from "@styles/Layout.module.css";
import Var from "./Var";
import Sidevar from "./Sidevar";

export default function Layout({
  children,
  style,
  title,
}: {
  children: ReactNode;
  style?: "only-nav";
  title?: string;
}) {
  const [visibility, setVisibility] = useState(false);
  return (
    <div className={styles.layout}>
      <Navar title={title} setVisibility={setVisibility} />
      <main className={styles.main}>{children}</main>
      <Var state={style} />
      <Sidevar visibility={visibility} setVisibility={setVisibility} />
    </div>
  );
}
