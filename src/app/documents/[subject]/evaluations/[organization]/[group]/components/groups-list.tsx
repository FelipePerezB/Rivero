import { auth } from "@clerk/nextjs";
import { Group } from "@prisma/client";
import React from "react";
import Options from "src/app/components/options/options";
import api from "src/app/utils/api";

export default async function GroupsList({
  group,
  organization,
  customPath,
}: {
  group: string;
  organization: string;
  customPath?: string
}) {
  const { getToken } = auth();
  const token = await getToken();
  const { data: groups } = (await api(`groups/${organization}`, {
    headers: { Authorization: `Bearer ${token}` },
  })) as { data: Group[] };
  const groupsData = groups.map(({ name, id }) => ({ name, id }));
  console.log(group);
  return (
    <Options
      customPath={customPath}
      option={group}
      options={[
        { key: "all", title: "Todos" },
        ...groupsData.map(({ id, name }) => ({ key: id, title: name })),
      ]}
    />
  );
}
