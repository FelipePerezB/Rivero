import { auth } from "@clerk/nextjs";
import { Group } from "@prisma/client";
import Options from "@components/navigation/options/options";
import React from "react";
import api from "src/utils/api";

export default async function GroupsList({
  group,
  organization,
  customPath,
}: {
  group: string;
  organization: string;
  customPath?: string;
}) {
  const { data: groups } = (await api(`groups/${organization}`, {})) as {
    data: Group[];
  };
  const groupsData = groups.map(({ name, id }) => ({ name, id }));
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
