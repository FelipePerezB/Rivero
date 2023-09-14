/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./StandardInput.module.css";
import React, { useEffect } from "react";
import capFirst from "src/utils/capFirst";
import { StandartInputAttrs } from "src/models/StandartInputAttr";

export default function StandardInput({
  value,
  type,
  onChange,
  name,
  dataKey,
  attrs,
  placeholder,
}: StandartInputAttrs) {
  useEffect(() => {
    value && createFormData(value);
  }, []);
  const createFormData = (data: string) => {
    const obj = {} as any;
    if (dataKey) obj[dataKey] = data;
    else obj[name] = data;
    onChange && onChange(obj);
  };
  return (
    <label className={styles["standart-input"]}>
      <span className={styles.name}>{capFirst(name)}</span>
      <input
        {...(attrs as {})}
        placeholder={placeholder}
        defaultValue={value}
        name={name}
        onChange={({ target }) => createFormData(target.value)}
        type={type}
      />
    </label>
  );
}
