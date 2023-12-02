"use client";
import StandardInput from "@components/form/StandardInput/StandardInput";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toast from "react-hot-toast";
import update from "../update-btn/update";
import TableBtn from "@components/dashboard/table/table-btn/table-btn";

export default function UpdateAlert({
  size = "md",
  value,
  endpoint,
  values,
}: {
  size?: "md" | "sm";
  value: string;
  endpoint: string;
  values?: { [ket: string]: unknown };
}) {
  const clickHandler = () => {
    toast((t) => (
      <div className="flex flex-col gap-2">
        <StandardInput
          value={value}
          onBlur={(data) => {
            if (!data) return;
            update(endpoint, { name: data, ...values });
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
      {!!(size === "md") && "Actualizar"}{" "}
      <FontAwesomeIcon icon={faPen} className="h-3 w-3" />
    </TableBtn>
  );
}
