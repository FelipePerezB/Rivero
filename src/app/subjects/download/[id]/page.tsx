import { auth } from "@clerk/nextjs";
import { File } from "@prisma/client";
import React from "react";
import api from "src/utils/api";
import DynamicElement from "../../components/elements/files/dynamic-file";
import DownloadBtn from "../components/download-btn";

export default async function DownloadFilePage({
  params: { id },
}: {
  params: { id: string };
}) {
  const { getToken } = auth();
  const token = await getToken();
  const { data } = (await api("files/" + id, {
    headers: { Authorization: `Bearer ${token}` },
  })) as { data: File };
  const content = JSON.parse(data.content);
  return (
    <>
      <DynamicElement attrs={{ ...content, ...data }} name={content.type} />
      <DownloadBtn/>
    </>
  );
}
