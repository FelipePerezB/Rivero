import { auth, currentUser } from "@clerk/nextjs";
import React from "react";
import EditWraper from "src/app/documents/edit/components/edit-wraper";
import { NoteWithFile } from "src/app/documents/models/note";
import api from "src/app/utils/api";
import useGetFile from "src/hooks/useGetFile";

export default async function EditPracticePage({
  params: { subject },
}: {
  params: { subject: string };
}) {
  const { getToken } = auth();
  const user = await currentUser();
  const token = await getToken();
  const { data } = (await api("notes/practice/" + subject, {
    headers: { Authorization: `Bearer ${token}` },
  })) as { data: NoteWithFile };
  return (
    <>
      <EditWraper
        document={{
          ...data,
          file: { ...data.File, content: JSON.parse(data.File.content) },
        }}
        id={data.File.externalId as string}
      />
    </>
  );
}
