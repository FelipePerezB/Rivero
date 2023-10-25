import { auth } from "@clerk/nextjs";
import Table from "@components/table/Table";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Group, Role, User } from "@prisma/client";
import Link from "next/link";
import React from "react";
import DeleteBtn from "src/app/components/admin/delete-btn/delete-btn";
import EditableLabel from "src/app/subjects/[subject]/[topic]/components/editable-label";
import api from "src/app/utils/api";
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
      key={`table-${name}`}
      data={Users.map(({ name, email, lastname }) => [
        capFirst(name),
        capFirst(lastname),
        email,
      ])}
      head={{
        title: (
          <EditableLabel
            endpoint={`groups/${organizationId}/${id}`}
            text={name}
          />
        ),
        keys: [
          { name: "Nombre", key: "name" },
          { name: "Apellido", key: "lastname" },
          { name: "Correo", key: "email" },
        ],
        icons: [
          <Link
            className="flex gap-1 items-center hover:text-blue-500 p-1 rounded-sm"
            href={`?modal=invite&groups=${id}&role=${Role.STUDENT}`}
            key={"invite-btn"}
          >
            <span>Invitar</span>
            <FontAwesomeIcon className="h-3 w-3" icon={faPlus} />
          </Link>,
          <DeleteBtn
            name={name}
            endpoint={`groups/${organizationId}/${id}`}
            key={`delete-table-${id}`}
          />,
        ],
      }}
    />
  ));
}
