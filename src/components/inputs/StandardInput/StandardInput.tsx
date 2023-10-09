import { StandartInputAttrs } from "src/models/StandartInputAttr";
import capFirst from "src/utils/capFirst";

export default function StandardInput(
  {
  value,
  type,
  onChange,
  name,
  dataKey,
  attrs,
  placeholder,
  }: StandartInputAttrs
) {
    const createFormData = (data: string) => {
    const obj = {} as any;
    if (dataKey) obj[dataKey] = data;
    else if (name) obj[name] = data;
    onChange && onChange(obj);
  };
  return (
    <label className="w-full mx-auto">
      {name && <span className="text-slate-700">{capFirst(name)}</span>}
      <input
        className="p-2 my-1 text-sm text-slate-700 card w-full focus:mb-0.5 focus:border-2 focus:border-blue-500 focus:outline-none focus:shadow focus:shadow-blue-500/10"
        {...(attrs as {})}
        defaultValue={value}
        name={name}
        onChange={({ target }) => createFormData(target.value)}
        type={type}
      />
    </label>
  );
}
