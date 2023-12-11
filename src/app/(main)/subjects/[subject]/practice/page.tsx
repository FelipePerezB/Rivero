import { auth, currentUser } from "@clerk/nextjs";
import { Role } from "@prisma/client";
import React from "react";
import api from "src/utils/api";
import CreateBtn from "./components/create-btn";
import DynamicElement from "../../components/elements/files/dynamic-file";
import { NoteWithFile } from "../../models/note";

export default async function PracticePage({
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
  return data.id ? (
    <DynamicElement attrs={JSON.parse(data.File.content)} name="practice" />
  ) : <></>
}
