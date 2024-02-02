import { auth } from "@clerk/nextjs";
import React from "react";
import { ChartComponent } from "@components/dashboard/charts/line/linechart";
import formatScores, { ScoresWithGroup } from "src/utils/format/formatScores";
import api from "src/utils/api";

export default async function ScoresChart({
  group,
  organization,
  subject,
}: {
  group: string;
  organization: string;
  subject: string;
}) {
  const { getToken } = auth();
  const token = await getToken();
  const groupQuery = group !== "all" ? `group=${group}&` : ``;
  const subjectQuery = subject ? `subject=${subject}&` : ``;
  const endpoint = `scores/${organization}?${subjectQuery}${groupQuery}`;
  const { data: scores } = (await api(
    endpoint,
    {
      cache: "no-store",
      headers: { Authorization: `Bearer ${token}` },
    },
    [
      !group
        ? `scores/subject/${subject}/organization/${organization}`
        : `scores/subject/${subject}/group/${group}`,
    ]
  )) as {
    data: ScoresWithGroup[];
  };
  const data = formatScores(scores) ?? {};
  const series =
    group === "all"
      ? Object.values(data)?.map((data) => ({ data }))
      : [{ data: data[Number(group)] }];

  return <ChartComponent series={series} />;
}
