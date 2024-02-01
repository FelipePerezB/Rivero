import { auth } from "@clerk/nextjs";
import React from "react";
import { ChartComponent } from "@components/dashboard/charts/line/linechart";
import api from "src/utils/api";
import { Score } from "@prisma/client";
import getAvg from "src/utils/maths/getAvg";
import formatScores, { ScoresWithGroup } from "src/utils/format/formatScores";

export default async function GroupStats({
  group,
  organization,
  subject,
  scores,
}: {
  scores: ScoresWithGroup[];
  group: string;
  organization: string;
  subject: string;
}) {
  const data = formatScores(scores);

  const series =
    group === "all"
      ? Object.values(data).map((data) => ({ data }))
      : [{ data: data[Number(group)] }];

  return series[0]?.data?.length ? (
    <ChartComponent series={series} />
  ) : (
    <>No hay datos todavia de este grupo</>
  );
}
