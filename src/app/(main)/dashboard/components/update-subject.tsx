import UpdateSearchModal from "@components/admin/update-form/update-search-modal";
import { Privacity, Subject, Types } from "@prisma/client";
import React from "react";
import CreateFileBtn from "../subjects/[id]/[topic]/[subtopic]/components/create-file-btn/create-file-btn";
import DeleteBtn from "@components/admin/delete-btn/delete-btn";
import CreateBtnWithName from "@components/admin/create-btn/create-btn-with-name";
import api from "src/utils/api";

export default async function UpdateSubject({
  subjectId,
  searchParams,
}: // id,
{
  subjectId: string;
  searchParams: { [key: string]: string };
  // id: string;
}) {
    const { data: subject } = (await api(`subjects/${subjectId}`, {}, [
    `subjects/${subjectId}`,
  ])) as { data: Subject };
  const id = subject?.id;
  return (
    <UpdateSearchModal
      label="asignatura"
      endpoint={`subjects/${id}`}
      data={subject}
      searchParams={searchParams}
      secondaryBtn={<DeleteBtn endpoint={`subjects/${id}`} size="md" />}
    >
      <div className="flex gap-4">
        <CreateFileBtn
          color="white"
          text="Crear práctica"
          type={Types.PRACTICE}
          subjectId={String(id)}
        />
          <CreateBtnWithName color="white" endpoint="topics" label="tópico" values={{ subjectId: id }} />
      </div>
    </UpdateSearchModal>
  );
}
