
import React from "react";
import useGetFile from "src/hooks/useGetFile";
import EditWraper from "../components/edit-wraper";

export default async function EditFilePage({
  searchParams,
  params: { id },
}: {
  searchParams: {[key: string]: string}
  params: { id: string };
}) {
  const file = await useGetFile(id, searchParams);

  return <>
  <EditWraper document={file} id={id} />
  </>
}
