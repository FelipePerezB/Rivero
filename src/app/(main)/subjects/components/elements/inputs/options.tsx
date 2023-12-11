import OptionsInput from "@components/form/OptionsInput/OptionsInput";
import React from "react";

export default function Options({
  options,
  label,
  dataKey,
  value,
  onChange,
  isLarge,
}: {
  value: string,
  options: string[];
  label: string;
  onChange: (value: { [key: string]: string }) => void;
  dataKey: string;
  isLarge?: boolean;
}) {
  return <OptionsInput {...{ isLarge, value, name: label, onChange, options, dataKey }} />;
}
