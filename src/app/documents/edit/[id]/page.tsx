import React from "react";
import EditWraper from "../components/edit-wraper";
import { File } from "@prisma/client";
import api from "src/utils/api";

export default async function EditFilePage({
  searchParams,
  params: { id },
}: {
  searchParams: { [key: string]: string };
  params: { id: string };
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

  return (
    <>
      <EditWraper document={file} id={id} />
    </>
  );
}
