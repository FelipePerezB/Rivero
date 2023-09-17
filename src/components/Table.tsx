import { ReactNode } from "react";

interface TableProps {
  head?: {
    title?: string;
    icons?: ReactNode;
    keys: { name: string; key?: string }[];
  };

  data?: (ReactNode | string | number)[][];
  onClick?: (row: unknown[]) => void;
}

const Row = ({
  children,
  onClick,
}: {
  children: ReactNode | string;
  onClick?: () => void;
}) => {
  return (
    <tr
      onClick={() => !!onClick && onClick()}
      className={`w-full flex justify-around  text-center py-1.5 p-2 border-t ${
        !!onClick ? "cursor-pointer" : ""
      }`}
    >
      {children}
    </tr>
  );
};

const Table: React.FC<TableProps> = ({ data, head, onClick }) => {
  return (
    <article>
      <table className="flex flex-col bg-white overflow-hidden border shadow-gray-300/30 shadow-lg rounded w-full">
        {head?.title && (
          <caption className="w-full flex px-2 py-2 justify-between items-center text-xs">
            <h2 className="text-base font-bold">{head.title}</h2>
            <div className="flex items-center gap-1">{head.icons}</div>
          </caption>
        )}
        {!!data?.length && (
          <thead>
            <Row>
              {head?.keys.map(({ name, key }, i) => (
                <th key={"th-" + i}>{name}</th>
              ))}
            </Row>
          </thead>
        )}
        <tbody className="inline-block w-full max-h-72 overflow-y-scroll">
          {data?.map((row, rowIndex) => (
            <Row
              key={"row-" + rowIndex}
              onClick={onClick && (() => !!onClick && onClick(row))}
            >
              {row.map((cell, cellIndex) => (
                <td
                  className="w-full overflow-hidden text-center text-ellipsis whitespace-nowrap"
                  key={`column-${cellIndex}-r${rowIndex} `}
                >
                  {cell}
                </td>
              ))}
            </Row>
          ))}
        </tbody>
      </table>
    </article>
  );
};

export default Table;
