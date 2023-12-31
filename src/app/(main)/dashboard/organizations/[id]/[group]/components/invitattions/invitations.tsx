import { auth } from "@clerk/nextjs";
import { Invitation } from "@prisma/client";
import React from "react";
import api from "src/utils/api";
import RevokeBtn from "./revoke-btn";
import ItemsBox from "@components/containers/items-box/items-box";
import Card from "@components/cards/Card";

export default async function Invitations({
  organization,
  group,
}: {
  organization: string;
  group: string;
}) {
  const { data: invitations } = (await api(
    `auth/invitation/organization/${organization}/${group}`,
    {}, []
  )) as { data: Invitation[] };
  return !!invitations.length ? (
    <>
      <h2 className="text-xl font-semibold">Invitaciones</h2>
      <ItemsBox>
        {invitations.map(({ email, id }) => (
          <Card
            className="flex justify-between items-center"
            key={`invitattion-${id}`}
          >
            {email}
            <RevokeBtn id={id} />
          </Card>
        ))}
      </ItemsBox>
    </>
  ) : (
    <></>
  );
}
