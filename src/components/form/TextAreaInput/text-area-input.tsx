import React, { TextareaHTMLAttributes } from "react";
import Label from "src/app/documents/edit/components/label";

export default function TextAreaInput({
  name,
  value,
  attrs,
}: {
  name: string
  value?: string;
  attrs: TextareaHTMLAttributes<HTMLTextAreaElement>;
}) {
  return (
    <Label name={name}>
      <textarea name={name} value={value} {...attrs} className="card text-sm" />
    </Label>
  );
}
