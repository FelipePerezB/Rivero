import { auth } from "@clerk/nextjs";
import React from "react";
import { ChartComponent } from "@components/dashboard/charts/line/linechart";
import api from "src/utils/api";

export default async function GroupStats({
  group,
  organization,
  subject,
  scores
}: {
  scores: {
    [x: string]: {
      value: number;
      time: string;
    }[];
  };
  group: string;
  organization: string;
  subject: string;
}) {



  const series =
    group === "all"
      ? Object.values(scores).map((data) => ({ data }))
      : [{ data: scores[Number(group)] }];

  return series[0]?.data?.length ? (
    <ChartComponent series={series} />
  ) : (
    <>No hay datos todavia de este grupo</>
  );
}
