import { auth } from "@clerk/nextjs";
import Card from "@components/Card";
import { Score } from "@prisma/client";
import React from "react";
import api from "src/app/utils/api";

const CardItem = ({ title, value }: { title: string; value: string }) => (
  <div className="flex flex-col items-center">
    <h3 className="font-bold">{title}</h3>
    <span>{value}</span>
  </div>
);

export default async function ScoresStats({evaluation, group}:{evaluation: string, group: string}) {
  const { getToken } = auth();
  const token = await getToken();

  const { data: scores } = (await api(`scores/${evaluation}/${group}`, {
    headers: { Authorization: `Bearer ${token}` },
  })) as { data: Score[] };

  const scoresNums = scores.map(({ score }) => score);
  const { length } = scores;
  const sortedScore = scoresNums.sort((a, b) => a - b);
  const maxScore = sortedScore.at(1);
  const minScore = sortedScore.at(-1);
  const avg = Number(
    (scoresNums.reduce((a, b) => a + b, 0) / length).toFixed(2)
  );
  const n = length % 2 === 0 ? length : length + 1;
  const quartile = (k: number) => {
    if (length <= 2) {
      return scoresNums.at(k <= 2 ? k - 1 : 1);
    }
    const index = (k * n) / 4;
    return index % 2 === 0
      ? scoresNums[index]
      : (scoresNums[Math.floor(index)] + scoresNums[Math.floor(index) + 1]) / 2;
  };

  return (
   <section className="grid md:grid-cols-2 gap-4 my-2">
      <Card className="flex justify-around ">
        <CardItem title="Puntaje menor" value={String(minScore)} />
        <CardItem title="Promedio" value={String(avg)} />
        <CardItem title="Puntaje mayor" value={String(maxScore)} />
      </Card>
      <Card className="flex justify-around ">
        <CardItem title="Q1" value={String(quartile(1))} />
        <CardItem title="Q2" value={String(quartile(2))} />
        <CardItem title="Q3" value={String(quartile(3))} />
      </Card>
    </section>
  );
}
