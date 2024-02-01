"use client";
import removeAlert from "@components/admin/remove-alert";
import { Row } from "@components/dashboard/table/Table";
import React, { ReactNode } from "react";

export default function RemoveUserWrapper({
  group,
  children,
  row,
  className,
}: {
  group: string | number
  children: ReactNode;
  row: Row;
  className: string;
}) {
  const removeGroup = () => {
    if (!row?.id) return;
    removeAlert({
      endpoint: `users/${row?.id}/remove/group/${group}`,
      message: "¿Seguro que quieres eliminar del grupo al usuario?",
    });
  };

  return (
    <tr className={className} onClick={removeGroup}>
      {children}
    </tr>
  );
}
