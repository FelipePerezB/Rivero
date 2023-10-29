"use client";
import Button from "@components/Button";
import React from "react";
import createAlert from "src/app/components/admin/create-alert/create-alert";

export default function CreateTopicBtn({ subjectId }: { subjectId: number }) {
  return (
    <Button
      onClick={() => createAlert({ endpoint: "topics", values: { subjectId } })}
      color="white"
    >
      Nuevo tópico
    </Button>
  );
}
