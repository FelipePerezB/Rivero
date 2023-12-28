import { ReactNode } from "react";
import Link from "next/link";
import Card from "@components/cards/Card";

interface TableProps {
  handlers?: ReactNode;
  head?: {
    title?: string | ReactNode;
    icons?: ReactNode[];
    keys: { name: string; key?: string }[];
  };

  data?: (ReactNode | string | number)[][];
  onClickHref?: string;
}

const Row = ({
  children,
  onClickHref,
}: {
  children: ReactNode | string;
  onClickHref?: string;
}) => {
  return (
    <tr
      className={`w-full border-t ${
        onClickHref ? "cursor-pointer hover:bg-slate-50" : ""
      }`}
    >
      {children}
    </tr>
  );
};

const Table: React.FC<TableProps> = ({ data, head, onClickHref, handlers }) => {
  return (
    <Card className="p-0 rounded-xl overflow-x-auto">
      <table className="w-full">
        {head?.title && (
          <caption className="p-[0.6em]">
            <div className="flex w-full justify-between items-center">
              <h3 className="text-[1.2em] font-bold">{head.title}</h3>
              <div className="flex items-center gap-2.5 text-sm">
                {head.icons?.map((icon) => icon)}
              </div>
            </div>
          </caption>
        )}
        {!!data?.length && (
          <thead className="w-full">
            <Row>
              {head?.keys.map(({ name, key }, i) => (
                <th className="py-[0.6em]" key={"th-" + i}>
                  {name}
                </th>
              ))}
            </Row>
          </thead>
        )}
        <tbody className=" w-full max-h-52 overflow-y-auto">
          {data?.map((row, rowIndex) => {
            const obj = {} as any;
            head?.keys.forEach(
              ({ key, name }, i) => (obj[key ?? name] = row[i])
            );
            const regex = /\[(\w+)]/g;
            const url =
              onClickHref?.replace(regex, (match, key) => obj[key] ?? match) ??
              "";

            return (
              <Row onClickHref={onClickHref} key={"row-" + rowIndex}>
                {row.map((cell, cellIndex) => {
                  return (
                    <td
                      className=" overflow-hidden text-center text-ellipsis whitespace-nowrap"
                      key={`column-${cellIndex}-r${rowIndex} `}
                    >
                      <Link
                        className="inline-block w-full p-[0.6em]"
                        href={url}
                      >
                        {cell}
                      </Link>
                    </td>
                  );
                })}
              </Row>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
};

export default Table;
