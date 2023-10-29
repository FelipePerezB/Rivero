import capFirst from "src/utils/capFirst";

const Tag = ({ children }: { children: JSX.Element | string }) => (
  <li className="border text-gray-600 rounded px-1 py-0.5 font-light text-xs h-max">
    {children}
  </li>
);

export default function Tags({ tags }: { tags?: string[] }) {
  return (
    <ul className="flex gap-2 overflow-hidden">
      {tags?.map((tag, i) => (
        <Tag key={tag + "-tag-" + i}>{capFirst(tag)}</Tag>
      ))}
      {!tags?.length && <Tag>Sin tópicos</Tag>}
    </ul>
  );
}
