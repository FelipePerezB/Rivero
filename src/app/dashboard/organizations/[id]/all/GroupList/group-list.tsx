import { auth } from "@clerk/nextjs";
import { Group } from "@prisma/client";
import CardWithItem from "@components/cards/card-with-item";
import ItemsBox from "@components/containers/items-box/items-box";
import React from "react";
import api from "src/utils/api";

export default async function GroupList({
  organization,
}: {
  organization: string;
}) {
  const { getToken } = auth();
  const token = await getToken();
  const { data: groups } = (await api(`groups/${organization}`, {
    headers: { Authorization: `Bearer ${token}` },
  })) as { data: Group[] };
  return !!groups.length ? (
    <>
      <h3 className="text-xl font-semibold">Grupos</h3>
      <ItemsBox>
        {groups.map(({ name, id }) => (
          <CardWithItem
            href={`${id}`}
            title={name}
            subtitle="Docentes: Jaime, Carla"
            key={`group-card-${id}`}
          >
            <p>17 estudiantes</p>
          </CardWithItem>
        ))}
      </ItemsBox>
    </>
  ) : (
    <></>
  );
}
