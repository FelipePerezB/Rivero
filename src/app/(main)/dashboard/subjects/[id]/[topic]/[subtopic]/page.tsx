import { File, Subtopic, Topic, Lesson } from "@prisma/client";
import api from "src/utils/api";
import CreateFileBtn from "./components/create-file-btn/create-file-btn";
import DeleteBtn from "@components/admin/delete-btn/delete-btn";
import Table from "@components/dashboard/table/Table";
import Options from "@components/navigation/options/options";
import capFirst from "src/utils/capFirst";
import UpdateSearchModal from "@components/admin/update-form/update-search-modal";

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
  const { data: subtopic } = (await api(`subtopics/${subtopicId}`, {}, [
    `subtopics/${subtopicId}`,
  ])) as { data: SubtopicWithFile };

  const { data: subtopics } = (await api(`topics/${topicId}/subtopics`, {}, [
    `topics/${topicId}`,
  ])) as {
    data: SubtopicWithLessons[];
  };

  const { data: lessons } = (await api(`lessons/documents/${subtopicId}`, {}, [
    `files/${topicId}`,
  ])) as { data: LessonWithFile[] };

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl text-semibold w-max">
          {capFirst(topic?.name)}
        </h2>
        <div className="flex gap-3">
          <CreateFileBtn {...{ subjectId, topicId, subtopicId }} />
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
        </div>
      </div>
      <Options
        options={subtopics?.map(({ name, id }) => ({
          key: id,
          title: capFirst(name),
        }))}
        option={subtopicId}
      />
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
    </>
  );
}
