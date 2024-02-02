import { auth, currentUser } from "@clerk/nextjs";
import BarsChart from "@components/dashboard/charts/bars/bars";
import { ChartComponent } from "@components/dashboard/charts/line/linechart";
import React from "react";
import api from "src/utils/api";
import formatScores, { ScoresWithGroup } from "src/utils/format/formatScores";

export default async function SubjectStats({ subject }: { subject: string }) {
  const { userId, getToken } = auth();
  const token = await getToken();
  const { data: scores } = (await api(`scores/user/${userId}`, {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })) as { data: ScoresWithGroup[] };
  const data = scores?.length
    ? Object.values(formatScores(scores))[0]?.map(({ time, value }) => ({
        label: time.substring(5),
        value,
      }))
    : [];
  return <BarsChart minSize={5} data={data} />;
}
