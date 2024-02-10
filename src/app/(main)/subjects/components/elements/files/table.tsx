import Table from "@components/dashboard/table/Table";
import React from "react";
import capFirst from "src/utils/capFirst";

export default function TableElement({
  id,
  options: { title, cols, rows } = { title: "Tabla", cols: [], rows: [] },
}: {
  id: string;
  options: { title: string; cols: string[]; rows: string[] };
}) {
  const data = rows?.map((row) => row?.split(","));
  const keys = cols?.map((value) => ({ name: value }));
  console.log(cols, rows);

  return (
    <table
      data-component={id}
      className="rounded-[0.1em] bg-white border border-black w-max mx-auto"
    >
      {title && (
        <caption className="py-[0.6em] w-max text-[1.2em] text-left font-semibold">
          {title}
        </caption>
      )}
      {!!data?.length && (
        <thead className="w-full">
          <tr className="w-full border-t border-black">
            {keys.map(({ name }, i) => (
              <th
                className={`py-[0.6em] px-[0.8em] ${
                  i + 1 < keys.length ? "border-r" : ""
                }  border-black`}
                key={"th-" + i}
              >
                {name}
              </th>
            ))}
          </tr>
        </thead>
      )}
      <tbody className=" w-full max-h-52 overflow-y-auto">
        {data?.map((row, rowIndex) => {
          return (
            <tr
              className={`w-full border-t border-black`}
              key={`row-${rowIndex}-${title}`}
            >
              {row.map((cell, cellIndex) => (
                <td
                  className={`${
                    cellIndex + 1 < row.length ? "border-r" : ""
                  } border-black overflow-hidden text-center text-ellipsis whitespace-nowrap`}
                  key={`column-${cellIndex}-${rowIndex}-${title} `}
                >
                  <span className="inline-block w-full p-[0.6em]">{cell}</span>
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
    // </div>
  );
}
