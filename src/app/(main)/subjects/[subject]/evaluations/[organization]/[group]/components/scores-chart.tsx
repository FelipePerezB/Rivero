import { auth } from "@clerk/nextjs";
import React from "react";
import { ChartComponent } from "@components/dashboard/charts/line/linechart";
import formatScores, { ScoresWithGroup } from "src/utils/format/formatScores";
import api from "src/utils/api";

export default async function ScoresChart({
  group,
  organization,
  subject,
  user,
}: {
  group: string;
  organization: string;
  subject: string;
  user?: string;
}) {
  const { getToken } = auth();
  const token = await getToken();
  const groupQuery = group !== "all" ? `group=${group}&` : ``;
  const subjectQuery = subject ? `subject=${subject}&` : ``;
  const userQuery = user ? `user=${user}&` : ``;
  const endpoint = `scores/${organization}?${subjectQuery}${groupQuery}${userQuery}`;
  const { data: scores } = (await api(
    endpoint,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
    [
      !group
        ? `scores/subject/${subject}/organizations/${organization}`
        : `scores/subject/${subject}/groups/${group}`,
    ]
  )) as {
    data: ScoresWithGroup[];
  };
  const data = formatScores(scores) ?? {};
  const date = new Date();
  const defaultTime = date.toISOString().split("T")[0];
  const series = scores?.length
    ? group === "all"
      ? Object.values(data)?.map((data) => ({ data }))
      : [{ data: data[Number(group)] }]
    : [
        {
          data: [{ time: defaultTime, value: 0 }],
        },
      ];

  return <ChartComponent series={series} />;
}
