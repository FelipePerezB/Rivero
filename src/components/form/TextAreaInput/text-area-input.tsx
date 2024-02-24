import React, { TextareaHTMLAttributes } from "react";
import Label from "src/app/documents/edit/components/label";

export default function TextAreaInput({
  label,
  name,
  value,
  attrs,
  onBlur
}: {
  label?: string;
  name: string;
  value?: string;
  attrs?: TextareaHTMLAttributes<HTMLTextAreaElement>;
  onBlur?:(value: string) => void
}) {
  return (
    <Label name={label ?? ""}>
      <textarea
        onBlur={({ target }) => {
          onBlur && onBlur(target.value);
        }}
        style={{ minHeight: "80px" }}
        name={name}
        defaultValue={value}
        {...attrs}
        className="card text-sm"
      />
    </Label>
  );
}
