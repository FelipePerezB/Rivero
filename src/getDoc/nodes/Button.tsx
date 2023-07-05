import React, { ReactNode } from "react";
import styles from "@/styles/Button.module.css";

export default function Button({
  // text,
  children,
  style = "primary",
  onClick,
}: {
  children: ReactNode
  style?: string;
  onClick?: any;
}) {
  return (
    <div className={styles.container}>
      <button type="button" className={styles[style]} onClick={onClick}>
        {children}
        {/* <span>{text}</span> */}
      </button>
    </div>
  );
}
