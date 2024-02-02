import { auth, currentUser } from "@clerk/nextjs";
import Item from "@components/dashboard/item";
import { Score } from "@prisma/client";
import React, { ReactNode } from "react";
import api from "src/utils/api";

export default async function AllScores() {
  const { userId, getToken } = await auth();
  const token = await getToken();
  const { data: scores } = (await api(
    `scores/user/${userId}`,
    {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    [`scores`]
  )) as {
    data: Score[];
  };
  return (
    <>
      <Item subtitle="Puntajes" title={scores?.length} />
      <Item subtitle="Último puntaje" title={scores[0]?.score ?? "---"} />
    </>
  );
}
