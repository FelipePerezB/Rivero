import React from "react";
import styles from "@styles/Options.module.css";

export default function Options({
  options,
  state,
  setState,
  color = "black"
}: {
  color?: string;
  options: string[];
  state: string;
  setState: any;
}) {
  const clickHandler = (option: string) => {
    setState(option);
  };
  return (
    <div className={styles.options}>
      <ul>
        {options?.map((option) => {
          const isActive = state?.toLowerCase() === option?.toLowerCase();
          return (
            <li onClick={() => clickHandler(option)} key={option}>
              <span style={{
                background: isActive ? "var(--primary-color)" : "white"
              }} className={styles[isActive ? "op--active" : "op"]}>
                {option}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
