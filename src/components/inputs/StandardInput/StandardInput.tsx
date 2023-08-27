/* eslint-disable react-hooks/exhaustive-deps */
import { ListTypeNode } from "graphql";
import styles from "./StandardInput.module.css";
import React, { useEffect } from "react";
import { capFirst } from "src/utils/capFirst";

export default function StandardInput({
  value,
  type,
  onChange,
  name,
  attrs,
  placeholder,
}: {
  attrs?: React.InputHTMLAttributes<[ListTypeNode, ListTypeNode]>;
  placeholder?: string;
  value?: string;
  name: string;
  onChange: (value: string) => void;
  type?: React.HTMLInputTypeAttribute | undefined;
}) {
  useEffect(() => {
    value && createFormData(value);
  }, []);
  const createFormData = (data: string) => {
    const obj = {} as any;
    obj[name] = data;
    onChange(obj);
  };
  return (
    <label className={styles["standart-input"]}>
      <span>{capFirst(name)}</span>
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
