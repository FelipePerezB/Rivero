"use client";
import Button from "@components/Button";
import { Types } from "@prisma/client";
import React from "react";
import createAlert from "src/app/components/admin/create-alert/create-alert";
// import createAlert from "src/app/components/admin/create-alert/create";

export default function CreateFileBtn({ subtopicId }: { subtopicId: string }) {
  return (
    <Button
      onClick={() =>
        createAlert({
          endpoint: "notes",
          values: { subtopicId, type: Types.DOCUMENT },
        })
      }
      color="white"
    >
      Nuevo documento
    </Button>
  );
}
