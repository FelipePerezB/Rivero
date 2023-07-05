import React, { ReactNode } from "react";
import styles from "@styles/Button.module.css";

export default function Button({
  children,
  style = "primary",
  callback,
}: {
  children: ReactNode;
  style?: string;
  callback?: any;
}) {
  return (
    <div className={styles.container}>
      <button className={styles[style]} onClick={callback}>
        <span>{children}</span>
      </button>
    </div>
  );
}
