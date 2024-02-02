import { auth } from "@clerk/nextjs";
import { Score } from "@prisma/client";
import Card from "@components/cards/Card";
import CardItem from "@components/cards/card-item";
import React, { ReactNode } from "react";
import api from "src/utils/api";
import getQuartile from "src/utils/maths/getQuartile";
import getAvg from "src/utils/maths/getAvg";
import Item from "@components/dashboard/item";
import StatsCardsGroup from "@components/cards/stats-card/stats-cards-group";
import StatsCard from "@components/cards/stats-card/stats-card";

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
  const { getToken } = auth();
  const token = await getToken();
  const { data } = (await api(
    `scores/${organization}/${evaluation}${group ? `?group=${groupId}` : ``}`,
    { cache: "no-store", headers: { Authorization: `Bearer ${token}` } }
  )) as { data: Score[] };

  const scores = data?.map(({ score }) => score);
  const sortedScore = scores.sort((a, b) => a - b);
  const maxScore = sortedScore.at(-1);
  const minScore = sortedScore.at(0);
  const avg = getAvg(scores);

  return !!scores?.length ? (
    <StatsCardsGroup>
      <StatsCard>
        <Item subtitle="Puntaje menor" title={String(String(minScore))} />
        <Item subtitle="Promedio" title={String(String(avg))} />
        <Item subtitle="Puntaje mayor" title={String(String(maxScore))} />
      </StatsCard>
      <StatsCard>
        <Item subtitle="Cuartil 1" title={String(getQuartile(scores, 1))} />
        <Item subtitle="Cuartil 2" title={String(getQuartile(scores, 2))} />
        <Item subtitle="Cuartil 3" title={String(getQuartile(scores, 3))} />
      </StatsCard>
    </StatsCardsGroup>
  ) : (
    <></>
  );
}
