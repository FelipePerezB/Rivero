import { File, Lesson } from "@prisma/client";
import React from "react";
import DynamicElement from "src/app/(main)/subjects/components/elements/files/dynamic-file";
import ScreenLayout from "src/app/(main)/subjects/components/layout/screen-layout";
import api from "src/utils/api";
import { LessonWithFile } from "../../models/lesson";

export default async function PracticePage({
  params: { subject },
}: {
  params: { subject: string };
}) {
  const { data } = (await api(`lessons/practice/${subject}`, {}, [
    `lessons/${subject}`,
  ])) as {
    data: LessonWithFile;
  };
  const lessonFile = data?.File
  let file;
  if (lessonFile?.content)
    file = {
      ...data,
      content: { ...JSON.parse(lessonFile.content) },
    };
  console.log(file);

  return (
    <ScreenLayout>
      <DynamicElement
        attrs={{ ...file?.content, metadata: { subject } }}
        name={file?.content?.type}
      />
    </ScreenLayout>
  );
}
