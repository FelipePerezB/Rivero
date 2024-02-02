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
  const { getToken } = auth();
  const token = await getToken();

  const groupId = group === "all" ? "" : group;
  const { data: selectedGroup } = (await api(
    `groups/${organization}/${groupId}`,
    {headers: { Authorization: `Bearer ${token}` }, cache: "no-store"}
  )) as { data: GroupWithUsers };

  const { data: scores } = (await api(
    `scores/${organization}/${evaluation}?group=${groupId}`,
    { cache: "no-store", headers: { Authorization: `Bearer ${token}` } }
  )) as { data: Score[] };

  const users = selectedGroup?.Users?.filter(
    ({ role }) => role === Role.STUDENT
  ).map(({ email, name, id }) => [
    id,
    `${name}`,
    email,
    scores?.find(({ userId }) => userId === id)?.score ?? "---",
  ]);


  console.log(scores, selectedGroup)
  return (
    <Table
      onClickHref="?modal=new-score&id=[id]"
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
