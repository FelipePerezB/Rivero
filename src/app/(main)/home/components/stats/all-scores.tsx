import { auth, currentUser } from "@clerk/nextjs";
import Item from "@components/dashboard/item";
import { Score } from "@prisma/client";
import React, { ReactNode } from "react";
import api from "src/utils/api";

export default async function AllScores() {
  const { userId, getToken } = auth();
  const token = await getToken();
  const user = await currentUser();
  const group = user?.publicMetadata?.group;
  const { data: scores } = group
    ? await api(
        `scores/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        [`scores/group/${group}`]
      )
    : ({ data: [] } as {
        data?: Score[];
      });
  return (
    <>
      <Item subtitle="Puntajes" title={scores?.length} />
      <Item subtitle="Último puntaje" title={scores[0]?.score ?? "---"} />
    </>
  );
}
