import React from "react";
import styles from "@styles/SwitchToogle.module.css";

export default function SwitchToogle({ state }: { state: boolean }) {
  return (
    <button className={styles["switch-toogle-" + state]}>
      <div></div>
    </button>
  );
}
