import Table, { Row } from "@components/dashboard/table/Table";
import { Group, Role, User } from "@prisma/client";
import React, { ReactNode } from "react";
import capFirst from "src/utils/capFirst";
import RemoveUserWrapper from "../../components/remove-user-wrapper";

interface GroupWithUsers extends Group {
  Users: User[];
}

export default function UsersTable({
  name,
  role: tableRole,
  groupData,
}: {
  name: string;
  role: Role;
  groupData: GroupWithUsers;
}) {
  const users = groupData?.Users?.filter(({ role }) => role === tableRole).map(
    ({ email, name, lastname, externalId }) => [
      externalId,
      capFirst(name),
      capFirst(lastname ?? ""),
      email,
    ]
  );
  const RemoveUserWrapperWithGroup = ({
    children,
    row,
    className,
  }: {
    className: string;
    row: Row;
    children: ReactNode;
  }) => (
    <RemoveUserWrapper row={row} group={groupData?.id} className={className}>
      {children}
    </RemoveUserWrapper>
  );

  return (
    <Table
      OnClickWrapper={RemoveUserWrapperWithGroup}
      onClickHref="?modal=update-user&name=[name]&lastname=[lastname]&email=[email]"
      head={{
        title: capFirst(name),
        keys: [
          { name: "ID", key: "id", hidden: true },
          { name: "Nombre", key: "name" },
          { name: "Apellido", key: "lastname" },
          { name: "Correo", key: "email" },
        ],
      }}
      data={users}
    />
  );
}
