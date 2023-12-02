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
  const data = rows?.map((row) =>
    row?.split(",").map((cell) => capFirst(cell))
  );
  return (
    <div data-component={id}>
      <Table
        head={{
          title,
          keys: cols?.map((value) => ({ name: capFirst(value) })),
        }}
        data={data}
      />
    </div>
  );
}
