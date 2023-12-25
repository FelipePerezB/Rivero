import StandardInput from "@components/form/StandardInput/StandardInput";
import React from "react";

export default function TextInput({
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
    <StandardInput
      {...{ onChange, name: label, dataKey, value, placeholder }}
    />
  );
}
