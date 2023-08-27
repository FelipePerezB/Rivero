import React, { ReactNode } from "react";
import styles from "@styles/Button.module.css";

export default function Button({
  children,
  style = "primary",
  onClick,
}: {
  children: ReactNode;
  style?: "primary" | "secundary"  | "small-active";
  onClick?: any;
}) {
  return (
    <div  className={styles[style]}>
      <button type="button" onClick={onClick}>
        <span>{children}</span>
      </button>
    </div>
  );
}
