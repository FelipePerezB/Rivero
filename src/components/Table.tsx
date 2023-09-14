import React, { ReactNode } from "react";
import styles from "@styles/Table.module.css";

interface TableProps {
  head?: {
    title?: string;
    icons?: ReactNode;
    keys: { name: string; key?: string }[];
  };

  data?: (ReactNode | string | number)[][];
  onClick?: (firstCell: string | number) => void;
}

const Table: React.FC<TableProps> = ({ data, onClick, head }) => {
  return (
    <article className={styles["table__container"]}>
      <table className={styles.table}>
        {head?.title && (
          <caption>
            <h2 className={styles.title}>{head.title}</h2>
            <div className={styles.icons}>{head.icons}</div>
          </caption>
        )}
        <thead>
          {!!data?.length && (
            <tr className={styles.head}>
              {head?.keys.map(({ name, key }, i) => (
                <th key={"th-" + i}>{name}</th>
              ))}
            </tr>
          )}
        </thead>
        <tbody>
          {data?.map((row, rowIndex) => (
            <tr key={"row-" + rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={`column-${cellIndex}-r${rowIndex} `}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
};

export default Table;
