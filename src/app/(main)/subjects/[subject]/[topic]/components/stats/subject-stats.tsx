import { currentUser } from "@clerk/nextjs";
import BarsChart from "@components/dashboard/charts/bars/bars";
import { ChartComponent } from "@components/dashboard/charts/line/linechart";
import React from "react";
import api from "src/utils/api";
import formatScores, { ScoresWithGroup } from "src/utils/format/formatScores";

export default async function SubjectStats({ subject }: { subject: string }) {
  const user = await currentUser();
  const organization = user?.publicMetadata?.organizationId;
  const group = user?.publicMetadata?.group as string;
  if (!user?.id || !organization || !group) return <></>;
  const { data: scores } = (await api(
    `scores/subject/${subject}/${organization}/${group}`,
    { cache: "no-store" }
  )) as { data: ScoresWithGroup[] };
  const data = formatScores(scores)[Number(group)].map(({time, value})=>({label: time.substring(5), value}));
  console.log(data)
  return <BarsChart minSize={5} data={data} />;
}
