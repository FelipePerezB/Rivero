/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import styles from "../styles/reportTemplate.module.css";

export default function GetNodeByString({
  value,
  setValue,
}: {
  value: string;
  setValue?: any;
}) {
  const parentRef = useRef<HTMLDivElement>(null);
  // const [value, setValue] = useState(value);

  useEffect(() => {
    if (!parentRef.current) return;
    // value.replaceAll("<bold>", "<span id='bold'>")
    // value.replaceAll("<bold/>", "<span/>")
    const nodes = value;
    parentRef.current.innerHTML = value;
    const node = <span>{value}</span>;
  }, [value]);

  useEffect(() => {
    if (!parentRef?.current) return;
    parentRef.current.addEventListener("keydown", () => {
      if (!parentRef?.current) return;
      setValue(parentRef?.current?.innerHTML);
    });
  }, []);

  return (
    <div contentEditable={true} className={styles.parent} ref={parentRef}></div>
  );
}
