import { auth } from "@clerk/nextjs";
import { Group } from "@prisma/client";
import CardWithItem from "@components/cards/card-with-item";
import ItemsBox from "@components/containers/items-box/items-box";
import React from "react";
import api from "src/utils/api";

export default async function GroupsLinks({
  subject,
  organization,
  evaluation,
}: {
  organization: string;
  subject: string;
  evaluation: string;
}) {
  const { getToken } = auth();
  const token = await getToken();
  const { data: groups } = (await api(`groups/${organization}`, {
    headers: { Authorization: `Bearer ${token}` },
  })) as { data: Group[] };

  const { data: scores } = (await api(
    `scores?subject=${subject}&evaluation=${evaluation}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
    [`scores/organizations/${organization}`]
  )) as {
    data: {
      [x: string]: {
        value: number;
        time: string;
      }[];
    };
  };

  return (
    <>
      <h2 className="text-xl font-semibold">Grupos</h2>
      <ItemsBox>
        {groups.map(({ name, id }) => {
          const length = scores[id]?.length;
          const avg =
            scores[id]?.map(({ value }) => value)?.reduce((a, b) => a + b) /
            length;
          return (
            <CardWithItem
              href={`/subjects/${subject}/evaluations/${organization}/${id}/${evaluation}`}
              title={name}
              key={`group-card-${id}`}
              subtitle={`${length ?? 0} registros`}
            >
              {!!avg ? (
                <>
                  <span className="text-xl">{avg.toFixed(0)} ptos.</span>
                  <span className="text-xs text-gray-400">Promedio</span>
                </>
              ) : (
                <span className="text-xl text-center">Sin información</span>
              )}
            </CardWithItem>
          );
        })}
      </ItemsBox>
    </>
  );
}
