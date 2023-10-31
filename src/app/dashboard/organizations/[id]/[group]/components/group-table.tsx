import { auth } from "@clerk/nextjs";
import Table from "@components/table/Table";
import TableBtn from "@components/table/table-btn/table-btn";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Group, Role, User } from "@prisma/client";
import React from "react";
import DeleteBtn from "src/app/components/admin/delete-btn/delete-btn";
import UpdateAlert from "src/app/components/admin/update-alert/update-alert";
import api from "src/app/utils/api";
import capFirst from "src/utils/capFirst";
interface GroupWithUsers extends Group {
  Users: User[];
}

export default async function GroupTable({
  organization,
  group: groupId,
}: {
  organization: string;
  group: string;
}) {
  const { getToken } = auth();
  const token = await getToken();
  const { data: group } = (await api(`groups/${organization}/${groupId}`, {
    headers: { Authorization: `Bearer ${token}` },
  })) as { data: GroupWithUsers };
  const { id, name, organizationId } = group;
  const users = group?.Users?.map(({ email, name, lastname }) => [
    capFirst(name),
    capFirst(lastname),
    email,
  ]);
  return (
    <Table
      onClickHref="?modal=update-user&"
      head={{
        icons: [
          <TableBtn
            href={`?modal=invite&group=${id}&role=${Role.STUDENT}`}
            key={`invite-btn-${id}`}
          >
            <span>Invitar</span>
            <FontAwesomeIcon className="h-3 w-3" icon={faPlus} />
          </TableBtn>,
        ],
        title: "Estudiantes",
        keys: [
          { name: "Nombre", key: "name" },
          { name: "Apellido", key: "lastname" },
          { name: "Correo", key: "email" },
        ],
      }}
      data={users}
    />
  );
}
