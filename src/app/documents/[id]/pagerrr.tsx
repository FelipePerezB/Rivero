import { File, Types } from "@prisma/client";
import React from "react";
import DynamicElement from "src/app/(main)/subjects/components/elements/files/dynamic-file";
import useGetFile from "src/hooks/useGetFile";
import api from "src/utils/api";
import { NoteWithComponent } from "../edit/models/component";

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
    console.log(data)
    // const { name } = data ?? {};
    if(typeof file?.content !== "object") return <></>
    const content = file.content as NoteWithComponent['file']['content']
    
  return (
    <DynamicElement
      attrs={{ ...content, name: type, type, documentId: id }}
      name={type}
    />
  );
}
