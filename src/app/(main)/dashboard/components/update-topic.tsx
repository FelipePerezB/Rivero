import CreateBtnWithName from "@components/admin/create-btn/create-btn-with-name";
import DeleteBtn from "@components/admin/delete-btn/delete-btn";
import UpdateSearchModal from "@components/admin/update-form/update-search-modal";
import { Privacity } from "@prisma/client";
import React from "react";

export default function UpdateTopic({
  topic,
  searchParams,
}: // id,
{
  topic: {
    name: string;
    privacity?: Privacity;
    id: string | number;
    [key: string]: unknown;
  };
  searchParams: { [key: string]: string };
}) {
  const id = topic?.id;
  return (
    <UpdateSearchModal
      color="white"
      label="tópico"
      data={topic}
      endpoint={`topics/${id}`}
      searchParams={searchParams}
      secondaryBtn={<DeleteBtn endpoint={`topics/${id}`} size="md" />}
    >
      <CreateBtnWithName color="white" endpoint="subtopics" label="subtópico" values={{ topicId: id }} />
      {/* <hr /> */}
    </UpdateSearchModal>
  );
}
