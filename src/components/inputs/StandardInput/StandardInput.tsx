import Label from "@components/create-components/edit-document/label";
import { StandartInputAttrs } from "src/models/StandartInputAttr";
import capFirst from "src/utils/capFirst";

export default function StandardInput({
  value,
  type,
  onChange,
  name,
  dataKey,
  attrs,
  placeholder,
}: StandartInputAttrs) {
  const createFormData = (data: string) => {
    const obj = {} as any;
    if (dataKey) obj[dataKey] = data;
    else if (name) obj[name] = data;
    onChange && onChange(obj);
  };
  return (
    <Label name={name} dataKey={dataKey}>
      <input
        id={dataKey}
        className="p-2 my-1 text-sm text-slate-700 card w-full focus:border-blue-500 focus:shadow-lg focus:outline-none"
        {...(attrs as {})}
        defaultValue={value}
        name={name}
        onChange={({ target }) => createFormData(target.value)}
        type={type}
      />
    </Label>
  );
}
