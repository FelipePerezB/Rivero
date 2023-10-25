"use client";
import Button from "@components/Button";
import React from "react";
import createAlert from "src/app/components/admin/create-alert/create";

export default function CreateTopicBtn({ subjectId }: { subjectId: string }) {
  return (
    <Button onClick={() => createAlert("topics", { subjectId })} color="white">
      Nuevo tópico
    </Button>
  );
}
