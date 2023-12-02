"use client";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TableBtn from "@components/dashboard/table/table-btn/table-btn";
import React from "react";
import createAlert from "@components/admin/create-alert/create-alert";
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
