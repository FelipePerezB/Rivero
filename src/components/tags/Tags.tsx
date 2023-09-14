import React from "react";
import styles from "./Tags.module.css";
import capFirst from "src/utils/capFirst";

export default function Tags({ tags }: { tags: string[] }) {
  return (
    <ul className={styles.tags}>
      {tags?.map((tag, i) => (
        <li key={tag + "-tag-" + i}>{`${capFirst(tag)}`}</li>
      ))}
    </ul>
  );
}
