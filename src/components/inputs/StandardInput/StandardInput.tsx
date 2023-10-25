/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";
import Label from "src/app/documents/edit/components/label";
import { StandartInputAttrs } from "src/models/StandartInputAttr";

export default function StandardInput({
  value,
  type,
  onChange,
  onBlur,
  name,
  dataKey,
  className,
  attrs,
}: StandartInputAttrs) {
  const [currentValue, setCurrentValue] = useState("");
  useEffect(() => {
    value && createFormData(value);
  }, [value]);
  const createFormData = (data: string) => {
    const obj = {} as any;
    if (dataKey) obj[dataKey] = data;
    else if (name) obj[name] = data;
    onChange && onChange(obj);
    setCurrentValue(data);
  };

  return (
    <Label className={className} name={name} dataKey={dataKey}>
      <input
        id={dataKey}
        className={`p-2 my-1 text-sm text-slate-700 card w-full focus:border-blue-500 focus:shadow-lg focus:outline-none`}
        {...(attrs as {})}
        value={currentValue}
        name={name}
        onChange={({ target }) => createFormData(target.value)}
        onBlur={({ target }) => {
          onBlur && onBlur(target.value);
        }}
        type={type}
      />
    </Label>
  );
}
