"use client";
import Button from "@components/common/buttons/button/button";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Types } from "@prisma/client";
import React from "react";
import createAlert from "@components/admin/create-alert/create-alert";
// import createAlert from "src/app/components/admin/create-alert/create";

export default function CreateEvaluationBtn({ subject }: { subject: string }) {
  return (
    <Button
      onClick={() =>
        createAlert({
          endpoint: "notes",
          values: { subjectId: subject, type: Types.EVALUATION },
        })
      }
    >
      Nuevo
      <FontAwesomeIcon icon={faPlus} className="h-2.5 w-2.5" />
    </Button>
  );
}
