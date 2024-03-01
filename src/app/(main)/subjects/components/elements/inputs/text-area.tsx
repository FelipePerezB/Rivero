import StandardInput from "@components/form/StandardInput/StandardInput";
import TextAreaInput from "@components/form/TextAreaInput/text-area-input";
import createFormData from "@components/form/utils/create-form-data";
import React from "react";

export default function TextArea({
  label,
  dataKey,
  value,
  placeholder,
  onChange,
}: {
  placeholder?: string;
  dataKey: string;
  label: string;
  value: string;
  onChange: (value: { [key: string]: string }) => void;
}) {
  const createFormData = (data: string) => {
    const obj = {} as any;
    if (dataKey) obj[dataKey] = data;
    else if (label) obj[label] = data;
    onChange && onChange(obj);
  };
  return (
    <TextAreaInput
      {...{
        name: label,
        dataKey,
        value,
        placeholder,
        attrs: { onChange: ({ target }) => createFormData(target.value) },
      }}
    />
  );
}
