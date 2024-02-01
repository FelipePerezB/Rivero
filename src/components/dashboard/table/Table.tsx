import Link from "next/link";
import { ReactNode } from "react";

export type Row = { [key: string]: ReactNode };

interface TableProps {
  handlers?: ReactNode;
  head?: {
    title?: string | ReactNode;
    keys: { name: string; key?: string; hidden?: boolean }[];
  };

  data?: (ReactNode | string | number)[][];
  onClickHref?: string;
  OnClickWrapper?: React.FC<{
    children: ReactNode;
    row: Row;
    className: string;
  }>;
}

const Row = ({
  children,
  className,
}: {
  children: ReactNode;
  row?: Row;
  className: string;
}) => <tr className={className}>{children}</tr>;

const Table: React.FC<TableProps> = ({
  data,
  head,
  OnClickWrapper = Row,
  onClickHref,
}) => {
  return (
    <div className=" rounded-lg border-border bg-white border shadow-md overflow-x-auto">
      <table className="w-full">
        {head?.title && (
          <caption className="p-[0.6em] text-[1.2em] text-left font-semibold">
            {head.title}
          </caption>
        )}
        {!!data?.length && (
          <thead className="w-full">
            <tr className="w-full border-t">
              {head?.keys.map(({ name, key, hidden }, i) =>
                hidden ? (
                  <></>
                ) : (
                  <th className="py-[0.6em] px-[0.8em]" key={"th-" + i}>
                    {name}
                  </th>
                )
              )}
            </tr>
          </thead>
        )}
        <tbody className=" w-full max-h-52 overflow-y-auto">
          {data?.map((row, rowIndex) => {
            const hiddenIndex: number[] = [];
            if (!head?.keys) return <></>;
            const data = {} as any;

            const obj = {} as any;
            head?.keys.forEach(
              ({ key, name }, i) => (obj[key ?? name] = row[i])
            );

            const regex = /\[(\w+)]/g;
            const url =
              onClickHref?.replace(regex, (match, key) => obj[key] ?? match) ??
              "";

            head?.keys.forEach(({ key, name, hidden }, i) => {
              if (hidden) hiddenIndex.push(i);
              return (data[key ?? name] = row[i]);
            });

            return (
              <OnClickWrapper
                className={`w-full border-t ${
                  true ? "cursor-pointer hover:bg-slate-50" : ""
                }`}
                row={data}
                key={`row-${rowIndex}-${head.title}`}
              >
                {row.map((cell, cellIndex) =>
                  hiddenIndex.includes(cellIndex) ? (
                    <></>
                  ) : (
                    <td
                      className=" overflow-hidden text-center text-ellipsis whitespace-nowrap"
                      key={`column-${cellIndex}-${rowIndex}-${head.title} `}
                    >
                      {url ? (
                        <Link
                          className="inline-block w-full p-[0.6em]"
                          href={url}
                        >
                          {cell}
                        </Link>
                      ) : (
                        <span className="inline-block w-full p-[0.6em]">
                          {cell}
                        </span>
                      )}
                    </td>
                  )
                )}
              </OnClickWrapper>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
