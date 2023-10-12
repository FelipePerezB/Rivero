
import React from "react";
import useGetFile from "src/hooks/useGetFile";
import EditWraper from "../components/edit-wraper";

export default async function EditFilePage({
  params: { id },
}: {
  params: { id: string };
}) {
  const file = await useGetFile(id);

  return <>
  <EditWraper document={file} id={id} />;
  </>
}
