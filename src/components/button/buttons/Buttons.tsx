import Button from "@components/Button";
import React, { ReactNode } from "react";
import styles from "./Buttons.module.css";

export default function Buttons({ children }: { children: ReactNode }) {
  return <div className={styles.btns}>{children}</div>;
}
