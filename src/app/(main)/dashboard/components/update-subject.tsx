import UpdateSearchModal from "@components/admin/update-form/update-search-modal";
import { Privacity, Types } from "@prisma/client";
import React from "react";
import CreateFileBtn from "../subjects/[id]/[topic]/[subtopic]/components/create-file-btn/create-file-btn";
import DeleteBtn from "@components/admin/delete-btn/delete-btn";

export default function UpdateSubject({
  subject,
  searchParams,
  // id,
}: {
  subject: {
    name: string;
    privacity?: Privacity;
    id: string | number;
    [key: string]: unknown;
  };
  searchParams: { [key: string]: string };
  // id: string;
}) {
  const id = subject?.id
  return (
    <UpdateSearchModal
      label="asignatura"
      endpoint={`subjects/${id}`}
      data={subject}
      searchParams={searchParams}
      secondaryBtn={<DeleteBtn endpoint={`subjects/${id}`} size="md" />}
    >
      <CreateFileBtn color="transparent" type={Types.PRACTICE} subjectId={String(id)} />
    </UpdateSearchModal>
  );
}
