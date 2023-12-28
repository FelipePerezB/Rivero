"use client";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import createAlert from "@components/admin/create-alert/create-alert";
import Button, { ButtonAttrs } from "@components/common/buttons/button/button";
import { Types } from "@prisma/client";
import create from "@components/admin/create-btn/create";

export default function CreateFileBtn({
  type,
  subtopicId,
  topicId,
  subjectId,
  text = "Nuevo",
  color,
}: {
  type?: Types;
  color?: ButtonAttrs["color"];
  text?: string;
  subtopicId?: string;
  topicId?: string;
  subjectId?: string;
}) {
  const endpoint = "lessons";
  return (
    <Button
      color={color}
      onClick={
        () => create(endpoint, { subtopicId, topicId, subjectId, type })

      }
    >
      {text} <FontAwesomeIcon icon={faPlus} className="h-3 w-3" />
    </Button>
  );
}
