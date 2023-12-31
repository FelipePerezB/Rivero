/* eslint-disable react-hooks/exhaustive-deps */
// "use client";
import { ListTypeNode } from "graphql";
import Label from "src/app/documents/edit/components/label";
export type props = {
  attrs?: React.InputHTMLAttributes<[ListTypeNode, ListTypeNode]>;
  placeholder?: string;
  value?: string;
  name: string;
  className?: string;
  label?:string;
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
  type?: React.HTMLInputTypeAttribute | undefined;
};

export default function TextInput({
  value,
  type,
  label,
  onChange,
  placeholder,
  onBlur,
  name,
  className,
  attrs,
}: props) {
  return (
    <Label name={label ?? ""} dataKey={name}>
      <input
        placeholder={placeholder}
        id={name}
        className={`p-2 my-1 text-sm text-slate-700 card w-full focus:border-blue-500 focus:shadow-lg focus:outline-none ${className}`}
        {...(attrs as {})}
        defaultValue={value}
        name={name}
        onChange={onChange ?  ({target}) => onChange(target?.value) : undefined}
        onBlur={onBlur ? ({ target }) => {
          onBlur(target.value);
        } : undefined}
        type={type}
      />
    </Label>
  );
}
