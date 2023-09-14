import React from "react";
import styles from "@styles/Options.module.css";

export default function Options({
  options,
  option,
  setOption,
}: {
  options?: string[];
  option?: string;
  setOption: any;
}) {
  return options && options?.length > 1 ? (
    <div className={styles.options}>
      <ul>
        {options?.map((opt) => {
          const isActive = opt?.toLowerCase() === option?.toLowerCase();
          return (
            <li
              className={styles[isActive ? "op--active" : "op"]}
              onClick={() => setOption(opt)}
              key={opt}
            >
              {opt}
            </li>
          );
        })}
      </ul>
    </div>
  ) : (
    <></>
  );
}
