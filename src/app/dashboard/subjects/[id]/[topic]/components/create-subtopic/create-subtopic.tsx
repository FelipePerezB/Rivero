"use client";
import Button from "@components/Button";
import TableBtn from "@components/table/table-btn/table-btn";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import createAlert from "src/app/components/admin/create-alert/create-alert";
// import createAlert from "src/app/components/admin/create-alert/create";

export default function CreateSubptopicBtn({ topicId }: { topicId: number }) {
  return (
    <TableBtn
      onClick={() =>
        createAlert({ endpoint: "subtopics", values: { topicId } })
      }
    >
      Nuevo
      <FontAwesomeIcon className="h-2.5 w-2.5" icon={faPlus} />
    </TableBtn>
  );
}
