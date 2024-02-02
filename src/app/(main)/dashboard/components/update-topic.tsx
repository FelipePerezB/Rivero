import CreateBtnWithName from "@components/admin/create-btn/create-btn-with-name";
import DeleteBtn from "@components/admin/delete-btn/delete-btn";
import UpdateSearchModal from "@components/admin/update-form/update-search-modal";
import { Privacity, Topic } from "@prisma/client";
import React from "react";
import api from "src/utils/api";

export default async function UpdateTopic({
  topicId,
  searchParams,
}: // id,
{
  topicId: string;
  searchParams: { [key: string]: string };
}) {
  const { data: topic } = (await api(`topics/${topicId}`, {}, [
    `topics/${topicId}`,
  ])) as {
    data: Topic;
  };
  return (
    <UpdateSearchModal
      color="white"
      label="tópico"
      data={topic}
      endpoint={`topics/${topicId}`}
      searchParams={searchParams}
      secondaryBtn={<DeleteBtn endpoint={`topics/${topicId}`} size="md" />}
    >
      <CreateBtnWithName endpoint="subtopics" label="subtópico" values={{ topicId }} />
    </UpdateSearchModal>
  );
}
