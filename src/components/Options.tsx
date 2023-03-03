import React from "react";
import styles from "@styles/Options.module.css";

export default function Options({
  options,
  state,
  setState,
}: {
  options: string[];
  state: string;
  setState: any;
}) {
  const clickHandler = (option: string) => {
    setState(option);
  };
  return (
    <div className={styles.options}>
      {options.map((option) => {
        const isActive = state === option;

        return (
          <div onClick={() => clickHandler(option)} key={option}>
            <span className={styles[isActive ? "op--active" : "op"]}>
              {option}
            </span>
            {options.indexOf(option) < options.length - 1 && (
              <span className={styles.separator}>|</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
