import { currentUser } from "@clerk/nextjs";
import { Role } from "@prisma/client";
import React, { ReactNode } from "react";
import RecognizeFileForm from "./recognize-file-form";

export default async function ValidateRecognizeForm({
  children,
  evaluationId,
  userId
}: {
  children: ReactNode;
  evaluationId: string;
  userId: string
}) {
  const user = await currentUser();
  const role = user?.publicMetadata?.role;
  const validation = role && role !== Role.STUDENT;

  return validation ? (
    <RecognizeFileForm evaluationId={evaluationId} userId={userId}>
      {children}
    </RecognizeFileForm>
  ) : ( 
    <div className="flex flex-col h-20">
      <span>Evaluación: {evaluationId}</span>
    </div>
  );
}
