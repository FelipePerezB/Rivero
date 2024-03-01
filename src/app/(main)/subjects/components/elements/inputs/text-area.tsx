import StandardInput from "@components/form/StandardInput/StandardInput";
import TextAreaInput from "@components/form/TextAreaInput/text-area-input";
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
  return (
    <TextAreaInput
      {...{ onChange, name: label, dataKey, value, placeholder }}
    />
  );
}
