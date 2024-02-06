import { auth } from "@clerk/nextjs";
import Card from "@components/cards/Card";
import StatsCard from "@components/cards/stats-card/stats-card";
import SectionTitle from "@components/common/titles/section-title/section-title";
import SmallTitle from "@components/common/titles/small-title";
import ItemsBox from "@components/containers/items-box/items-box";
import Section from "@components/containers/section";
import SmallSkeleton from "@components/layout/loading-skeleton/small-skeleton";
import { Score } from "@prisma/client";
import React, { Suspense } from "react";
import api from "src/utils/api";
import getAvg from "src/utils/maths/getAvg";

export default async function ReportPage({
  params: { evaluation, group, organization, subject },
}: {
  params: { [key: string]: string };
}) {
  const { getToken } = auth();
  const token = await getToken();
  const {
    data: { answers: expectedAnswers, name },
  } = (await api(`lessons/evaluations/questions/${evaluation}`, {}, [
    `files/${evaluation}`,
  ])) as {
    data: { answers: { expectedAns: string; isPilot: boolean }[]; id: number, name: string };
  };

  const { data: scores } = (await api(
    `scores/${organization}?group=${group}&evaluation=${evaluation}&subject=${subject}`,
    { headers: { Authorization: `Bearer ${token}` } },
    [`scores/evaluation/${evaluation}/groups/${group}`]
  )) as { data: Score[] };

  console.log(scores);

  const avgScore = getAvg(scores.map(({ score }) => score));

  const answers = scores.map(({ alternatives }) => alternatives.split(",")) as (
    | "a"
    | "b"
    | "c"
    | "d"
    | "e"
  )[][];

  return (
    <>
      <Section>
        <div className="flex justify-between items-center">
          <SectionTitle
            title={name ?? "Resumen de la evaluación"}
            subTitle={`Resumen de los resultados del grupo`}
          />
          <div className="flex w-20 sm:w-40 gap-1 items-end justify-center sm:p-4 p-0 h-9 sm:h-20">
            <Suspense fallback={<SmallSkeleton />}>
              <span className="text-3xl sm:text-5xl text-blue-500 font-semibold">
                {avgScore}
              </span>
              <span className="text-sm sm:text-base font-light text-blue-500">
                ptje.
              </span>
            </Suspense>
          </div>
        </div>
      </Section>
      <Section>
        <SmallTitle>Preguntas</SmallTitle>
        <ItemsBox size="lg">
          {expectedAnswers?.map(({ expectedAns, isPilot }, i) => {
            const answer = expectedAns.toUpperCase();
            const alternatives = {
              A: 0,
              B: 0,
              C: 0,
              D: 0,
              E: 0,
            } as any;

            answers.forEach((ans) => {
              const alternative = ans[i].toUpperCase();
              if (!alternative) return;
              alternatives[alternative] += 1;
            });

            const sum = (Object.values(alternatives) as number[]).reduce(
              (a, b) => a + b,
              0
            );

            let questionPercentege = 0;
            const percentages = Object.entries(alternatives).map(
              ([alternative, frecuency]) => {
                const percentage =
                  (((frecuency as number) || 0) * 100) / (sum || 1);
                if (alternative === answer) questionPercentege = percentage;
                return {
                  alternative,
                  frecuency,
                  percentage,
                };
              }
            );

            let questionColor = "text-blue-500";
            if (questionPercentege < 40) questionColor = "text-blue-300/90";
            else if (questionPercentege <= 60) questionColor = "text-blue-500/80";
            else if (questionPercentege < 60) questionColor = "text-blue-600";

            const number = i + 1;
            return (
              <Card
                className="w-full flex flex-col gap-md"
                key={`question-${number}-${answer}`}
              >
                <div className="flex gap-sm items-center">
                  <div className="rounded-full h-11 w-11 border aspect-square text-xl flex justify-center items-center">
                    <span className="text-slate-500">{number}</span>
                  </div>
                  <div className={`${questionColor} text-3xl font-medium`}>
                    {questionPercentege}%
                  </div>
                </div>
                <div className="flex gap-x-sm flex-wrap gap-y-3">
                  {percentages.map(({ alternative, frecuency, percentage }) => (
                    <div
                      className={`py-0.5 px-1 border rounded-sm w-max ${
                        answer === alternative
                          ? "border-blue-500 text-blue-400"
                          : ""
                      }`}
                      key={`question-${number}-${answer}-${alternative}`}
                    >
                      {alternative}: {`${percentage}%`}
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </ItemsBox>
      </Section>
    </>
  );
}
