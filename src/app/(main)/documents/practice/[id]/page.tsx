import { File } from "@prisma/client";
import React from "react";
import DynamicElement from "src/app/(main)/subjects/components/elements/files/dynamic-file";
import ScreenLayout from "src/app/(main)/subjects/components/layout/screen-layout";
import api from "src/utils/api";

export default async function PracticePage({
  params: { id },
}: {
  params: { id: string };
}) {
  const { data } = (await api("files/" + id, {}, [`files/${id}`])) as {
    data: File;
  };
  let file;
  if (data?.content)
    file = {
      ...data,
      content: { ...JSON.parse(data.content) },
    };
  return (
    <ScreenLayout>
      <DynamicElement
        attrs={{ ...file?.content, documentId: id }}
        name={file?.content?.type}
      />
    </ScreenLayout>
  );
}
