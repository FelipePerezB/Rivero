import { auth } from "@clerk/nextjs";
import Card from "@components/Card";
import CardItem from "@components/cards/card-item/card-item";
import { Score } from "@prisma/client";
import React from "react";
import api from "src/app/utils/api";

export default async function ScoresStats({
  evaluation,
  group,
  organization,
}: {
  organization: string
  evaluation: string;
  group?: string;
}) {
  const { getToken } = auth();
  const token = await getToken();

  const { data } = (await api(`scores/${organization}/${evaluation}?group=${group??""}`, {
    headers: { Authorization: `Bearer ${token}` },
  })) as { data: Score[] };

  const scores = data?.map(({ score }) => score);
  const length = data?.length;
  const sortedScore = scores.sort((a, b) => a - b);
  const maxScore = sortedScore.at(-1);
  const minScore = sortedScore.at(0);
  const avg = Number((scores.reduce((a, b) => a + b, 0) / length).toFixed(0));

  function quartile(k: number) {
    if (length === 1) return scores[0];
    const P = (k * (length + 1)) / 4;
    const difference = P - Math.floor(P);
    return Number.isInteger(P)
      ? scores[P - 1]
      : difference === 0.5
      ? (scores[Math.floor(P) - 1] + scores[Math.floor(P)]) / 2
      : scores[Number(P.toFixed(0)) - 1];
  }

  return !!scores?.length ? (
    <section className="grid md:grid-cols-2 gap-4 my-2">
      <Card className="flex justify-around ">
        <CardItem title="Puntaje menor" value={String(minScore)} />
        <CardItem title="Promedio" value={String(avg)} />
        <CardItem title="Puntaje mayor" value={String(maxScore)} />
      </Card>
      <Card className="flex justify-around ">
        <CardItem title="Q1" value={quartile(1)} />
        <CardItem title="Q2" value={quartile(2)} />
        <CardItem title="Q3" value={quartile(3)} />
      </Card>
    </section>
  ) : (
    <></>
  );
}
