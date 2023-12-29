import { File, Types } from "@prisma/client";
import React from "react";
import DynamicElement from "src/app/(main)/subjects/components/elements/files/dynamic-file";
import { LessonWithComponent } from "src/app/documents/edit/models/component";
import useGetFile from "src/hooks/useGetFile";
import api from "src/utils/api";
// import { LessonWithComponent } from "../edit/models/component";

export default async function SubjectDocumentPage({
  params: { id },
  searchParams,
}: {
  params: { [key: string]: string };
  searchParams: { [key: string]: string };
}) {
  let file;
  const { data } = (await api("files/" + id, {}, [`files/${id}`])) as {
    data: File;
  };
  if (data?.content)
    file = {
      ...data,
      content: { ...JSON.parse(data.content), searchParams },
    };

    const type = Types.DOCUMENT.toLowerCase();
  
    // const { name } = data ?? {};
    if(typeof file?.content !== "object") return <></>
    const content = file.content as LessonWithComponent['file']['content']
    
  return (
    <DynamicElement
      attrs={{ ...file,...content, type, documentId: id  }}
      name={content?.type}
    />
  );
}
