import { currentUser } from "@clerk/nextjs";
import Item from "@components/dashboard/item";
import { Score } from "@prisma/client";
import React, { ReactNode } from "react";
import api from "src/utils/api";

export default async function AllScores() {
  const user = await currentUser();
  console.log(user?.id);
  const { data: scores } = (await api(
    `scores/user/${user?.id}`,
    { cache: "no-store" },
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
