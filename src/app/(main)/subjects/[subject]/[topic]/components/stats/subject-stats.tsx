import { auth, currentUser } from "@clerk/nextjs";
import BarsChart from "@components/dashboard/charts/bars/bars";
import { ChartComponent } from "@components/dashboard/charts/line/linechart";
import { Score } from "@prisma/client";
import React from "react";
import api from "src/utils/api";
import formatScores, {
  ScoresWithGroup,
  formatWithoutGroupScores,
} from "src/utils/format/formatScores";

export default async function SubjectStats({ subject }: { subject: string }) {
  const { userId, getToken } = auth();
  const token = await getToken();
  const user = await currentUser();
  const group = user?.publicMetadata.group;
  const { data: scores } = (await api(
    `scores/user/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    [`scores/group/${group}`]
  )) as { data: Score[] };
  const data =
    formatWithoutGroupScores(scores)?.map(({ time, value }) => ({
      label: time.substring(5),
      value,
    })) ?? [];
  return <BarsChart minSize={5} data={data} />;
}
