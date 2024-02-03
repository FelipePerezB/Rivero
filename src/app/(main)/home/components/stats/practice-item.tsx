import React, { ReactNode } from "react";
// import { Item } from "../../page";
import api from "src/utils/api";
import { Subject } from "@prisma/client";
import Item from "@components/dashboard/item";


export default async function PracticeItem({
  subjects,
}: {
  subjects: Subject[];
}) {
  const practices = await Promise.all(
    subjects.map(async (subject) => {
      const { data } = (await api(
        `users/cache/practice/${subject?.id}`,
        {cache: "no-store"}
      )) as {
        data: string;
      };
      return Object.entries(data).length
    })
  );

  const totalPractices = practices.reduce((a,b)=>a+b,0)

  return <Item subtitle="Practicas" title={totalPractices} />;
}
