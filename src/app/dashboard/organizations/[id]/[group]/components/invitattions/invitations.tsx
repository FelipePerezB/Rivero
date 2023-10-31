import { auth } from "@clerk/nextjs";
import Card from "@components/Card";
import { Invitation } from "@prisma/client";
import React from "react";
import ItemsBox from "src/app/components/items-box/items-box";
import api from "src/app/utils/api";
import RevokeBtn from "./revoke-btn";

export default async function Invitations({
  organization,
  group,
}: {
  organization: string;
  group: string;
}) {
  const { getToken } = auth();
  const token = await getToken();
  const { data: invitations } = (await api(
    `auth/invitation/organization/${organization}/${group}`,
    { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" }
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
  ) : <></>;
}
