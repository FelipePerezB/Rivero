import React from "react";
import EditWraper from "src/app/documents/edit/components/edit-wraper";
import useGetFile from "src/hooks/useGetFile";

export default async function EditPracticePage({
  params,
}: {
  params: { id: string };
}) {
  console.log(params)
  // const file = await useGetFile(id);
  return (
    <></>
    // <EditWraper document={file} id={file.file.externalId as string} />
  );
}
