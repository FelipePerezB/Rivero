"use client";
import TableBtn from "@components/table/table-btn/table-btn";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Types } from "@prisma/client";
import React from "react";
import createAlert from "src/app/components/admin/create-alert/create-alert";
// import createAlert from "src/app/components/admin/create-alert/create";

export default function CreateFileBtn({ subtopicId }: { subtopicId: string }) {
  return (
    <TableBtn
      onClick={() =>
        createAlert({
          endpoint: "notes",
          values: { subtopicId, type: Types.DOCUMENT },
        })
      }
    >
      Nuevo <FontAwesomeIcon icon={faPlus} className="h-3 w-3"/>
    </TableBtn>
  );
}
