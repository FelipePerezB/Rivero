import { auth } from "@clerk/nextjs";
import { Score } from "@prisma/client";
import Card from "@components/cards/Card";
import CardItem from "@components/cards/card-item";
import React, { ReactNode } from "react";
import api from "src/utils/api";
import getQuartile from "src/utils/maths/getQuartile";
import getAvg from "src/utils/maths/getAvg";
import Item from "@components/dashboard/item";

export default async function ScoresStats({
  evaluation,
  group,
  organization,
}: {
  organization: string;
  evaluation: string;
  group?: string;
}) {
  const groupId = group === "all" ? "" : group;
  const { data } = (await api(
  `scores/${organization}/${evaluation}${group ? `?group=${groupId}` : `` }`,
    {}
  )) as { data: Score[] };

  const scores = data?.map(({ score }) => score);
  const sortedScore = scores.sort((a, b) => a - b);
  const maxScore = sortedScore.at(-1);
  const minScore = sortedScore.at(0);
  const avg = getAvg(scores);

  return !!scores?.length ? (
    <section className="grid md:grid-cols-2 gap-md my-2">
      <Card className="flex justify-around ">
        <Item subtitle="Puntaje menor" title={String(String(minScore))} />
        <Item subtitle="Promedio" title={String(String(avg))} />
        <Item subtitle="Puntaje mayor" title={String(String(maxScore))} />
      </Card>
      <Card className="flex justify-around ">
        <Item subtitle="Cuartil 1" title={String(getQuartile(scores, 1))} />
        <Item subtitle="Cuartil 2" title={String(getQuartile(scores,2))} />
        <Item subtitle="Cuartil 3" title={String(getQuartile(scores,3))} />
      </Card>
    </section>
  ) : (
    <></>
  );
}
