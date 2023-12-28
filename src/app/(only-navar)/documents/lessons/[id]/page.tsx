import { File, Lesson, Types } from "@prisma/client";
import React from "react";
import DynamicElement from "src/app/(main)/subjects/components/elements/files/dynamic-file";
import { LessonWithComponent } from "src/app/documents/edit/models/component";
import useGetFile from "src/hooks/useGetFile";
import api from "src/utils/api";

interface LessonWithFile extends Lesson {
  File: File;
}
// import { LessonWithComponent } from "../edit/models/component";

export default async function LessonPage({
  params: { id },
  searchParams,
}: {
  params: { [key: string]: string };
  searchParams: { [key: string]: string };
}) {
  let file;
  const { data } = (await api(`lessons/${id}`, { cache: "no-store" }, [
    `files/${id}`,
  ])) as {
    data: LessonWithFile;
  };
   
  if (data?.File?.content)
    file = {
      ...data,
      content: { ...JSON.parse(data?.File?.content), searchParams },
    };

  const type = Types.DOCUMENT.toLowerCase();
   
  if (typeof file?.content !== "object") return <></>;
  const content = file.content as LessonWithComponent["file"]["content"];
  const metadata = {
    subtopicId: data.subtopicId,
    topicId: data.topicId,
    subjectId: data.subjectId,
  };

  return (
    <DynamicElement
      attrs={{ ...content, name: type, type, documentId: id, metadata }}
      name={type}
    />
  );
}
