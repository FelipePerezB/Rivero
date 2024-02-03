import { File, Subtopic, Topic, Lesson } from "@prisma/client";
import api from "src/utils/api";
import CreateFileBtn from "./components/create-file-btn/create-file-btn";
import DeleteBtn from "@components/admin/delete-btn/delete-btn";
import Table from "@components/dashboard/table/Table";
import Options from "@components/navigation/options/options";
import capFirst from "src/utils/capFirst";
import UpdateSearchModal from "@components/admin/update-form/update-search-modal";
import SectionTitle from "@components/common/titles/section-title/section-title";
import Section from "@components/containers/section";
import { Suspense } from "react";
import TableSkeleton from "@components/layout/loading-skeleton/table-skeleton/table-skeleton";

interface SubtopicWithFile extends Subtopic {
  File: File[];
}
interface LessonWithFile extends Lesson {
  File: File;
}

interface SubtopicWithLessons extends Subtopic {
  Lesson: LessonWithFile[];
}

export default async function SubtopicPage({
  params: { topic: topicId, subtopic: subtopicId, id: subjectId },
  searchParams,
}: {
  params: { id: string; topic: string; subtopic: string };
  searchParams: { [key: string]: string };
}) {
  const { data: topic } = (await api(`topics/${topicId}`, {}, [
    `topics/${topicId}`,
  ])) as {
    data: Topic;
  };

  return (
    <>
      <Section>
        <SectionTitle
          subTitle="Administra el tópico"
          title={capFirst(topic?.name)}
        />
        <article className="flex justify-between items-center">
          <Suspense fallback={<LargeSkeleton />}>
            <SubtopicsList {...{ subtopicId, topicId }} />
          </Suspense>
          <div className="flex gap-2.5">
            <CreateFileBtn
              text="Nuevo documento"
              {...{ subjectId, topicId, subtopicId }}
            />
            <UpdateSubtopicModal {...{ searchParams, subtopicId }} />
          </div>
        </article>
        <Suspense fallback={<TableSkeleton />}>
          <SubtopicTable subtopicId={subtopicId} topicId={topicId} />
        </Suspense>
      </Section>
    </>
  );
}

async function SubtopicsList({
  topicId,
  subtopicId,
}: {
  topicId: string;
  subtopicId: string;
}) {
  const { data: subtopics } = (await api(`topics/${topicId}/subtopics`, {}, [
    `topics/${topicId}`,
  ])) as {
    data: SubtopicWithLessons[];
  };
  return (
    <Options
      options={subtopics?.map(({ name, id }) => ({
        key: id,
        title: capFirst(name),
      }))}
      option={subtopicId}
    />
  );
}

async function SubtopicTable({
  subtopicId,
  topicId,
}: {
  subtopicId: string;
  topicId: string;
}) {
  const { data: lessons } = (await api(`lessons/documents/${subtopicId}`, {}, [
    `files/${topicId}`,
  ])) as { data: LessonWithFile[] };

  const { data: subtopic } = (await api(`subtopics/${subtopicId}`, {}, [
    `subtopics/${subtopicId}`,
  ])) as { data: SubtopicWithFile };

  return (
    <Table
      onClickHref={`/documents/edit/[id]`}
      data={lessons?.map(({ File: { name, externalId, privacity } }) => [
        externalId,
        capFirst(name),
        privacity,
      ])}
      head={{
        title: capFirst(subtopic?.name),
        keys: [
          { name: "Id", key: "id" },
          { name: "Nombre", key: "name" },
          { name: "Privacidad", key: "privacity" },
        ],
      }}
    />
  );
}

import React from "react";
import LargeSkeleton from "@components/layout/loading-skeleton/large-skeleton/large-skeleton";

async function UpdateSubtopicModal({
  subtopicId,
  searchParams,
}: {
  subtopicId: string;
  searchParams: { [key: string]: string };
}) {
  const { data: subtopic } = (await api(`subtopics/${subtopicId}`, {}, [
    `subtopics/${subtopicId}`,
  ])) as { data: SubtopicWithFile };
  return (
    <UpdateSearchModal
      color="white"
      data={{ ...subtopic }}
      endpoint={`subtopics/${subtopicId}`}
      label="subtópico"
      searchParams={searchParams}
      secondaryBtn={
        <DeleteBtn endpoint={`subtopics/${subtopicId}`} size="md" />
      }
    />
  );
}
