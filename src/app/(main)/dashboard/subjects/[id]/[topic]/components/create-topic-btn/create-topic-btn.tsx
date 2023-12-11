"use client";
import Button from "@components/common/buttons/button/button";
import React from "react";
import createAlert from "@components/admin/create-alert/create-alert";

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
