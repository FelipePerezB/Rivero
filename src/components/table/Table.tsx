import { ReactNode } from "react";
import Card from "../Card";
import Link from "next/link";

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
      className={`w-full flex justify-around border-t ${
        onClickHref ? "cursor-pointer hover:bg-slate-50" : ""
      }`}
    >
      {children}
    </tr>
  );
};

const Table: React.FC<TableProps> = ({ data, head, onClickHref, handlers }) => {
  return (
    <Card className="p-0">
      <table className="flex flex-col">
        {head?.title && (
          <caption className="w-full flex justify-between items-center py-2 px-2">
            <h3 className="text-lg font-bold">{head.title}</h3>
            <div className="flex items-center gap-2.5 text-sm">
              {head.icons?.map((icon) => icon)}
            </div>
          </caption>
        )}
        {!!data?.length && (
          <thead>
            <Row>
              {head?.keys.map(({ name, key }, i) => (
                <th className="py-2" key={"th-" + i}>
                  {name}
                </th>
              ))}
            </Row>
          </thead>
        )}
        <tbody className="inline-block w-full max-h-52 overflow-y-scroll">
          {data?.map((row, rowIndex) => (
            <Row onClickHref={onClickHref} key={"row-" + rowIndex}>
              {row.map((cell, cellIndex) => (
                <td
                  className="w-full overflow-hidden text-center text-ellipsis whitespace-nowrap"
                  key={`column-${cellIndex}-r${rowIndex} `}
                >
                  {onClickHref ? (
                    <Link
                      className="inline-block w-full py-2"
                      href={`${onClickHref}${row
                        ?.map((cell, i) => {
                          const separator = i !== 0 ? `&` : "";
                          const key = head?.keys[i].key;
                          return `${separator}${key}=${cell}`;
                        })
                        .join("")}`}
                    >
                      {cell}
                    </Link>
                  ) : (
                    <span className="inline-block w-full py-2">{cell}</span>
                  )}
                </td>
              ))}
            </Row>
          ))}
        </tbody>
      </table>
    </Card>
  );
};

export default Table;
