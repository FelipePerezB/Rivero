import { auth } from "@clerk/nextjs";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Group, Role, User } from "@prisma/client";
import Table from "@components/dashboard/table/Table";
import TableBtn from "@components/dashboard/table/table-btn/table-btn";
import React from "react";
import DeleteBtn from "@components/admin/delete-btn/delete-btn";
import UpdateAlert from "@components/admin/update-alert/update-alert";
import api from "src/utils/api";
import capFirst from "src/utils/capFirst";

interface GroupsWithUsers extends Group {
  Users: User[];
}

export default async function GroupsTables({
  organizationId,
}: {
  organizationId: string;
}) {
  const { getToken } = auth();
  const token = await getToken();
  const { data: groups } = (await api(`groups/${organizationId}`, {
    headers: { Authorization: `Bearer ${token}` },
  })) as { data: GroupsWithUsers[] };
  return groups.map(({ name, id, Users }) => (
    <Table
      onClickHref={"?modal=update-user&"}
      key={`table-${name}`}
      data={Users.map(({ name, email, lastname }) => [
        capFirst(name),
        capFirst(lastname ?? ""),
        email,
      ])}
      head={{
        title: capFirst(name),
        keys: [
          { name: "Nombre", key: "name" },
          { name: "Apellido", key: "lastname" },
          { name: "Correo", key: "email" },
        ],
        icons: [
          <TableBtn
            href={`?modal=invite&group=${id}&role=${Role.STUDENT}`}
            key={`invite-btn-${id}`}
          >
            <span>Invitar</span>
            <FontAwesomeIcon className="h-3 w-3" icon={faPlus} />
          </TableBtn>,
          <UpdateAlert
            size="sm"
            key={`edit-btn-${id}`}
            endpoint={`groups/${organizationId}/${id}`}
            value={name}
          />,
          <DeleteBtn
            name={name}
            key={`delete-btn-${id}`}
            endpoint={`groups/${organizationId}/${id}`}
          />,
        ],
      }}
    />
  ));
}
