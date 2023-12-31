import React, { TextareaHTMLAttributes } from "react";
import Label from "src/app/documents/edit/components/label";

export default function TextAreaInput({
  label,
  name,
  value,
  attrs,
}: {
  label?: string
  name: string
  value?: string;
  attrs: TextareaHTMLAttributes<HTMLTextAreaElement>;
}) {
  return (
    <Label name={label ?? ""}>
      <textarea name={name} value={value} {...attrs} className="card text-sm" />
    </Label>
  );
}
