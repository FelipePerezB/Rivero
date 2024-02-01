"use client";
import removeAlert from "@components/admin/remove-alert";
import { Row } from "@components/dashboard/table/Table";
import React, { ReactNode } from "react";

export default function RemoveAdminWrapper({
  children,
  row,
  className,
}: {
  children: ReactNode;
  row: Row;
  className: string;
}) {
  const removeAdmin = () => {
    if (!row?.id) return;
    removeAlert({
      endpoint: `auth/admins/remove/${row.id}`,
      message: "¿Seguro que quieres eliminar el administrador?",
    });
  };

  return (
    <tr className={className} onClick={removeAdmin}>
      {children}
    </tr>
  );
}
