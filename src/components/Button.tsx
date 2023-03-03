import React from "react";
import styles from "@styles/Button.module.css";

export default function Button({
  text,
  style = "primary",
  callback,
}: {
  text: string;
  style?: string;
  callback?: any;
}) {
  return (
    <div className={styles.container}>
      <button className={styles[style]} onClick={callback}>
        <span>{text}</span>
      </button>
    </div>
  );
}
