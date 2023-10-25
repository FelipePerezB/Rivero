import { auth } from "@clerk/nextjs";
import Table from "@components/table/Table";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Group, Score, User } from "@prisma/client";
import Link from "next/link";
import React from "react";
import api from "src/app/utils/api";

interface GroupWithUsers extends Group {
  Users: User[];
}

export default async function ScoresTable({
  evaluation,
  group,
  organization,
}: {
  evaluation: string;
  group: string;
  organization: string;
}) {
  const { getToken } = auth();
  const token = await getToken();
  const { data: selectedGruop } = (await api(
    `groups/${organization}/${group}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  )) as { data: GroupWithUsers };

  const { data: scores } = (await api(`scores/${evaluation}/${group}`, {
    headers: { Authorization: `Bearer ${token}` },
  })) as { data: Score[] };

  const users = selectedGruop?.Users?.map(({ email, name, lastname, id }) => [
    `${name} ${lastname}`,
    email,
    scores?.find(({ userId }) => userId === id)?.score ?? "---",
  ]);
  // const Users =
  return (
    <Table
      head={{
        title: selectedGruop?.name,
        icons: [
          <Link href={"?"} className="flex gap-2 items-center p-1 hover:bg-gray-50 rounded-sm" key={"add-btn"}>
            Añadir
            <FontAwesomeIcon icon={faPlus} className="h-3 w-3"/>
          </Link>,
        ],
        keys: [
          { name: "Nombre", key: "name" },
          { name: "Correo", key: "email" },
          { name: "Puntaje", key: "score" },
        ],
      }}
      data={users}
    />
  );
}
