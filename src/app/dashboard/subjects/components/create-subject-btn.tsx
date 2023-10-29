"use client";
import Button from "@components/Button";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import createAlert from "src/app/components/admin/create-alert/create";

export default function CreateSubjectBtn() {
  return (
    <Button onClick={() => createAlert("subjects", {})}>
      Nuevo <FontAwesomeIcon className="h-2.5 w-2.5" icon={faPlus} />
    </Button>
  );
}
