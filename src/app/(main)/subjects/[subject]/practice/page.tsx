import { auth, currentUser } from "@clerk/nextjs";
import { Role } from "@prisma/client";
import React from "react";
import api from "src/utils/api";
import CreateBtn from "./components/create-btn";
import DynamicElement from "../../components/elements/files/dynamic-file";
import { LessonWithFile } from "../../models/lesson";

export default async function PracticePage({
  params: { subject },
}: {
  params: { subject: string };
}) {
  const { getToken } = auth();
  const user = await currentUser();
  const token = await getToken();
  return <></>
  // return data.id ? (
    // <DynamicElement attrs={JSON.parse(data.File.content)} name="practice" />
  // ) : <></>
}
