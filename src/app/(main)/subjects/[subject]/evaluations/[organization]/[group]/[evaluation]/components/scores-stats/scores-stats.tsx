import { auth } from "@clerk/nextjs";
import { Score } from "@prisma/client";
import React, { ReactNode } from "react";
import api from "src/utils/api";
import getQuartile from "src/utils/maths/getQuartile";
import getAvg from "src/utils/maths/getAvg";
import Item from "@components/dashboard/item";
import StatsCardsGroup from "@components/cards/stats-card/stats-cards-group";
import StatsCard from "@components/cards/stats-card/stats-card";

export default async function ScoresStats({
  evaluation,
  subject,
  group,
  organization,
}: {
  organization: string;
  evaluation?: string;
  subject?: string;
  group?: string;
}) {
  const groupId = group === "all" ? "" : group;
  const { getToken } = auth();
  const token = await getToken();

  const groupQuery = group ? `group=${groupId}&` : ``;
  const evaluationQuery = evaluation ? `evaluation=${evaluation}&` : ``;
  const subjectQuery = subject ? `subject=${subject}&` : ``;
  const endpoint = `scores/${organization}?${subjectQuery}${groupQuery}${evaluationQuery}`;

  const { data } = (await api(
    endpoint,
    { headers: { Authorization: `Bearer ${token}` }},
    [!group ? `scores/organizations/${organization}` : `scores/groups/${group}`]
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
