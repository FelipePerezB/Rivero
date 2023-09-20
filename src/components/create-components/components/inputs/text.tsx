import StandardInput from "@components/inputs/StandardInput/StandardInput";
import React from "react";

export default function TextInput({
  label,
  dataKey,
  value,
  onChange,
}: {
  dataKey: string
  label: string;
  value: string;
  onChange: (value: { [key: string]: string }) => void;
}) {
  console.log(dataKey)
  return <StandardInput {...{ onChange, name: label, dataKey, value }} />;
}
