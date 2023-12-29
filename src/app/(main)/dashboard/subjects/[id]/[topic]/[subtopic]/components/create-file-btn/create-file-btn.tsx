// "use client";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Button, { ButtonAttrs } from "@components/common/buttons/button/button";
import { Types } from "@prisma/client";
import api from "src/utils/api";
import { auth } from "@clerk/nextjs";

const action = async (
  {
    endpoint,
    values,
  }: { endpoint: string; values: { [key: string]: unknown } },
  formData: FormData
) => {
  "use server";
  const { userId } = auth();
  await api(endpoint, {
    method: "POST",
    body: JSON.stringify({ ...values, userId }),
  });
};

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
  const createAction = action.bind(null, {
    endpoint,
    values: { type, subtopicId, topicId, subjectId },
  });

  return (
    <form action={createAction}>
      <Button type="submit" color={color}>
        {text} <FontAwesomeIcon icon={faPlus} className="h-3 w-3" />
      </Button>
    </form>
  );
}
