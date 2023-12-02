import { auth, currentUser } from "@clerk/nextjs";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Group, Role, Score, User } from "@prisma/client";
import Table from "@components/dashboard/table/Table";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import api from "src/utils/api";

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
  // if(group)
  const { getToken } = auth();
  const user = await currentUser();
  if (user?.publicMetadata?.role === Role.STUDENT) {
    redirect("/");
  }
  const token = await getToken();
  const groupId = group === "all" ? "" : group;
  const { data: selectedGroup } = (await api(
    `groups/${organization}/${groupId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  )) as { data: GroupWithUsers };

  const { data: scores } = (await api(`scores/${organization}/${evaluation}`, {
    headers: { Authorization: `Bearer ${token}` },
  })) as { data: Score[] };

  const users = selectedGroup?.Users?.map(({ email, name, id }) => [
    id,
    `${name}`,
    email,
    scores?.find(({ userId }) => userId === id)?.score ?? "---",
  ]);
  return (
    <Table
      onClickHref="?modal=new-score&"
      head={{
        title: selectedGroup?.name,
        keys: [
          { name: "id", key: "id" },
          { name: "Nombre", key: "name" },
          { name: "Correo", key: "email" },
          { name: "Puntaje", key: "score" },
        ],
      }}
      data={users}
    />
  );
}
