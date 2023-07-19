import React, { ReactNode } from "react";
// import styles from "@/styles/Home.module.css"

export default function CustomComponent({
  children,
  id,
  style,
}: {
  children: ReactNode;
  id: string;
  style: any,
}) {
  return (
    <span key={id} className={"component"} style={style} id={id}>
      {children}
    </span>
  );
}
