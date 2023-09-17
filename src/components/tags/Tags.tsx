import capFirst from "src/utils/capFirst";

const Tag = ({ children }: { children: JSX.Element | string }) => (
  <li className="border rounded-sm px-1 py-0.5 text-slate-700 font-light text-xs">
    {children}
  </li>
);

export default function Tags({ tags }: { tags?: string[] }) {
  return (
    <ul className="flex gap-2">
      {tags?.map((tag, i) => (
        <Tag key={tag + "-tag-" + i}>{capFirst(tag)}</Tag>
      ))}
      {!tags?.length && <Tag>Sin tópicos</Tag>}
    </ul>
  );
}
