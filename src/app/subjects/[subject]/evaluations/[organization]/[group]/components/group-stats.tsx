import { auth } from "@clerk/nextjs";
import React from "react";
import { ChartComponent } from "src/app/components/charts/line/linechart";
import api from "src/app/utils/api";

export default async function GroupStats({ group, organization }: { group: string, organization: string }) {
  const { getToken } = auth();
  const token = await getToken();
  const { data: scores } = (await api(
    `scores?group=${group !== "all" ? group : ""}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }, [`scores/organizations/${organization}`]
  )) as {
    data: {
      [x: string]: {
        value: number;
        time: string;
      }[];
    };
  };

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
