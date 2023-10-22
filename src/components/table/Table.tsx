'use client'
import { ReactNode } from "react";
import Card from "../Card";
import Link from "next/link";

interface TableProps {
  head?: {
    title?: string | ReactNode;
    icons?: ReactNode[];
    keys: { name: string; key?: string }[];
  };

  data?: (ReactNode | string | number)[][];
  onClick?: (row: unknown[]) => void;
}

const Row = ({
  children,
}: // onClick,
{
  children: ReactNode | string;
  // onClick?: () => void;
}) => {
  return (
    <tr
      // onClick={() => !!onClick && onClick()}
      className={`w-full flex justify-around py-2 p-2 border-t ${
        ""
        // !!onClick ? "cursor-pointer" : ""
      }`}
    >
      {children}
    </tr>
  );
};

const Table: React.FC<TableProps> = ({ data, head }) => {
  return (
    <Card>
      <table className="flex flex-col">
        {head?.title && (
          <caption className="w-full flex justify-between items-center">
            <h3 className="text-lg font-bold">{head.title}</h3>
            <div className="flex items-center gap-2.5 text-sm">
              {head.icons?.map((icon) => icon)}
            </div>
          </caption>
        )}
        {!!data?.length && (
          <thead className="mt-2">
            <Row>
              {head?.keys.map(({ name, key }, i) => (
                <th key={"th-" + i}>{name}</th>
              ))}
            </Row>
          </thead>
        )}
        <tbody className="inline-block w-full max-h-52 overflow-y-scroll">
          {data?.map((row, rowIndex) => (
            <Row key={"row-" + rowIndex}>
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
    </Card>
  );
};

export default Table;
