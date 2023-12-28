import { File } from "@prisma/client";
import React from "react";
import api from "src/utils/api";
import EvaluationEditor from "../evaluation-editor";

export default async function EvaluationPage({
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
      content: { ...JSON.parse(data.content) },
    };
  return <EvaluationEditor data={data} id={id} />;
}
