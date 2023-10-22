import { auth } from '@clerk/nextjs';
import React from 'react'
import { ChartComponent } from 'src/app/components/charts/line/linechart'
import api from 'src/app/utils/api';

export default async function GroupStats({group}:{group:string}) {
  const { getToken } = auth();
  const token = await getToken();
  const { data: scores } = (await api(`scores`, {
    headers: { Authorization: `Bearer ${token}` },
  })) as {
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
    <ChartComponent series={group === "all" ? series : series} />
  ) : (
    <>No hay datos todavia de este grupo</>
  )
}
