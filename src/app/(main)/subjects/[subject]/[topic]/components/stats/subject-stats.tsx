import { auth, currentUser } from "@clerk/nextjs";
import BarsChart from "@components/dashboard/charts/bars/bars";
import { Score } from "@prisma/client";
import React from "react";
import api from "src/utils/api";
import formatDate from "src/utils/format/formatDate";
import { formatWithoutGroupScores } from "src/utils/format/formatScores";

export default async function SubjectStats({ subject }: { subject: string }) {
  const { userId, getToken } = auth();
  const token = await getToken();
  const user = await currentUser();
  const group = user?.publicMetadata.group;
  const organizationId = user?.publicMetadata.organizationId;
  const { data: scores } = (await api(
    `scores/user/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    [`scores/groups/${group}`]
  )) as {
    data: (Score & {
      lesson: {
        File: {
          externalId: string;
        };
      };
    })[];
  };
  const data =
    scores.map(
      ({
        createdAt,
        score,
        lesson: {
          File: { externalId },
        },
        userId,
      }) => ({
        label: formatDate(createdAt)?.substring(5),
        value: score,
        link: `/subjects/${subject}/evaluations/${organizationId}/${group}/${externalId}/${userId}`,
      })
    ) ?? [];
  return <BarsChart minSize={5} data={data} />;
}
