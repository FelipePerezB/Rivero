import React from "react";
import DynamicElement from "src/app/(main)/subjects/components/elements/files/dynamic-file";
import useGetFile from "src/hooks/useGetFile";

export default async function SubjectDocumentPage({
  params: { document: documentId },
  searchParams,
}: {
  params: { [key: string]: string };
  searchParams: { [key: string]: string };
}) {
  console.log(documentId)
  const file = await useGetFile(documentId, searchParams);
  // const {
  //   file: { name, content },
  //   type,
  // } = file ?? {};
  return (

    <></>
    // <DynamicElement
    //   attrs={{ ...content, name, type, editMode: true }}
    //   name={content.type}
    // />
  );
}
