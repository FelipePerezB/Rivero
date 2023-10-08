import capFirst from "src/utils/capFirst";

export default function TextInput({
  name,
  className,
  dataKey,
  onChange,
}: {
  onChange: (data: { [key: string]: unknown }) => void;
  name?: string;
  dataKey?: string;
  className?: string;
}) {
  console.log(onChange)
  return (
    <label className={`w-full mx-auto ${className}`}>
      {name && <span>{capFirst(name)}</span>}
      <input
        onBlur={({ target }) =>
          onChange({ [(dataKey || name) as string]: target.value })
        }
        className="p-2 my-1 text-sm text-slate-700 card w-full focus:mb-0.5 focus:border-2 focus:border-blue-500 focus:outline-none focus:shadow focus:shadow-blue-500/10"
      />
    </label>
  );
}
