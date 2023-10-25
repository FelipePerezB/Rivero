"use client";
import StandardInput from "@components/inputs/StandardInput/StandardInput";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import toast from "react-hot-toast";
import create from "../create-btn/create";
import TableBtn from "@components/table/table-btn/table-btn";

export default function CreateAlert({
  endpoint,
  values,
}: {
  endpoint: string;
  values?: { [ket: string]: unknown };
}) {
  const clickHandler = () => {
    toast((t) => (
      <div className="flex flex-col gap-2">
        <StandardInput
          onBlur={(data) => {
            if (!data) return;
            create(endpoint, { name: data, ...values });
            toast.dismiss(t?.id);
          }}
          name="Nombre"
          dataKey="name"
        />
      </div>
    ));
  };
  return (
    <TableBtn onClick={clickHandler}>
      Nuevo <FontAwesomeIcon icon={faPlus} className="h-2.5 w-2.5" />
    </TableBtn>
  );
}
