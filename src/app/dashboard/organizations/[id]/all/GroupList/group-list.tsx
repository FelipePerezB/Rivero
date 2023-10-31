import { auth } from "@clerk/nextjs";
import CardWithItem from "@components/cards/card-with-item/card-with-item";
import { Group } from "@prisma/client";
import React from "react";
import ItemsBox from "src/app/components/items-box/items-box";
import api from "src/app/utils/api";

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
