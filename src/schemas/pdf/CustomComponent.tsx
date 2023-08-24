import React, { ReactNode } from "react";
import getID from "src/getDoc/utils/getId";
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
  // const id = getID()
  return (
    <div key={id} className={"component"} style={style} id={id}>
      {children}
    </div>
  );
}
