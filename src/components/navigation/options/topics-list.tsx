import { Topic } from "@prisma/client";
import React, { Suspense } from "react";
import Options from "./options";
import capFirst from "src/utils/capFirst";
import api from "src/utils/api";
import LargeSkeleton from "@components/layout/loading-skeleton/large-skeleton/large-skeleton";

export async function TopicsList({
  subjectId,
  topicId,
}: {
  subjectId: string;
  topicId: string;
}) {
  const { data: topics } = (await api(`subjects/${subjectId}/topics`, {}, [
    `subjects/${subjectId}`,
  ])) as {
    data: Topic[];
  };
  return (
    <Options
      option={topicId}
      options={topics?.map(({ name, id }) => ({
        title: capFirst(name),
        key: id,
      }))}
    />
  );
}
export async function TopicsListWithSuspense({
  subjectId,
  topicId,
}: {
  subjectId: string;
  topicId: string;
}) {
  return (
    <Suspense fallback={<LargeSkeleton />}>
      <TopicsList subjectId={subjectId} topicId={topicId} />
    </Suspense>
  );
}
