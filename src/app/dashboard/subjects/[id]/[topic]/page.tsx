import Button from "@components/Button";
import Table from "@components/table/Table";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Privacity, Subject, Subtopic, Topic } from "@prisma/client";
import React from "react";
import { Toaster } from "react-hot-toast";
import SearchModal from "src/app/components/modal/search-modal";
import Options from "src/app/components/options/options";
import api from "src/app/utils/api";
import capFirst from "src/utils/capFirst";
import TableBtn from "@components/table/table-btn/table-btn";
import UpdateForm from "src/app/components/admin/update-form/update-form";
import CreateFileBtn from "./components/create-file-btn/create-file-btn";
import ItemsBox from "src/app/components/items-box/items-box";
import { NoteWithFile } from "src/app/subjects/models/note";
import DeleteBtn from "src/app/components/admin/delete-btn/delete-btn";
import NavigationCard from "@components/cards/navigationCard/NavigationCard";
import CreateTopicBtn from "./components/create-topic-btn/create-topic-btn";
import CreateSubtopic from "./components/create-subtopic/create-subtopic";
import CreateEvaluationBtn from "./components/create-evaluation-btn/create-evaluation-btn";

export default async function SubjectDashboard({
  params: { id, topic: topicId },
  searchParams,
}: {
  params: { id: string; topic: string };
  searchParams: { [key: string]: string };
}) {
  const { data: topic } = (await api(`topics/${topicId}`, {}, [
    `topics/${topicId}`,
  ])) as {
    data: Topic;
  };
  const { data: subtopics } = (await api(`subtopics?topic=${topicId}`, {}, [
    `subtopics/${topicId}`,
  ])) as { data: Subtopic[] };

  const { data: subject } = (await api(`subjects/${id}`, {}, [
    `subjects/${id}`,
  ])) as { data: Subject };

  const { data: topics } = (await api(`topics?subject=${id}`, {}, [
    `subjects/${id}`,
  ])) as {
    data: Topic[];
  };

  const { data: evaluations } = (await api(
    `notes/evaluations?subject=${id}`,
    {},
    ["evaluations/" + subject?.id]
  )) as { data: NoteWithFile[] };

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl text-semibold w-max">
          {capFirst(subject?.name)}
        </h2>
        <span className="flex gap-2">
          <Button href={"?modal=modify-subject"}>Modificar</Button>
          <CreateTopicBtn subjectId={Number(subject?.id)} />
        </span>
      </div>
      <Options
        options={topics?.map(({ name, id }) => ({
          key: id,
          title: capFirst(name),
        }))}
        option={topicId}
      />
      <Table
        onClickHref="?modal=modify-subtopic&"
        data={subtopics?.map(({ name, id }) => [id, capFirst(name), "Público"])}
        head={{
          icons: [
            <CreateSubtopic
              key={"create-topic-alert"}
              topicId={Number(topic?.id)}
            />,
            <TableBtn href="?modal=modify-topic" key={"edit-btn"}>
              <FontAwesomeIcon className="h-2.5 w-2.5" icon={faPen} />
            </TableBtn>,
            <DeleteBtn
              key={"delete-topic"}
              endpoint={`topics/${topic?.id}`}
              name={topic?.name}
            />,
          ],
          title: capFirst(topic?.name),
          keys: [
            { name: "Id", key: "id" },
            { name: "Nombre", key: "name" },
            { name: "Privacidad", key: "privacity" },
          ],
        }}
      />
      <div className="flex justify-between">
        <h2 className="font-semibold text-xl">Evaluaciones</h2>
        <CreateEvaluationBtn subject={String(subject?.id)} />
      </div>
      <ItemsBox>
        {evaluations?.map(({ File: {id, name} }) => (
          <NavigationCard
            key={`evaluation-${id}`}
            href={`?modal=modify&id=${id}&name=${name}`}
          >
            {name}
          </NavigationCard>
        ))}
      </ItemsBox>
      <SearchModal
        title="Modificar evaluación"
        searchParams={searchParams}
        id="modify"
      >
        <UpdateForm
          endpoint={`files/${searchParams?.id}`}
          id={String(searchParams?.id)}
          name={searchParams?.name}
          privacity={(Privacity.PRIVATE as Privacity) ?? undefined}
          secondaryBtn={
            <DeleteBtn endpoint={`notes/${searchParams?.id}`} size="md" />
          }
        />
      </SearchModal>
      <SearchModal
        title="Modificar evaluación"
        searchParams={searchParams}
        id="modify"
      >
        <UpdateForm
          endpoint={`files/${searchParams?.id}`}
          id={String(searchParams?.id)}
          name={searchParams?.name}
          privacity={(Privacity.PRIVATE as Privacity) ?? undefined}
          secondaryBtn={
            <DeleteBtn endpoint={`notes/${searchParams?.id}`} size="md" />
          }
        />
      </SearchModal>
      <SearchModal
        title="Modificar subtópico"
        searchParams={searchParams}
        id="modify-subtopic"
      >
        <UpdateForm
          endpoint={`subtopics/${searchParams?.id}`}
          id={searchParams?.id}
          name={searchParams?.name}
          privacity={searchParams.privacity as Privacity | undefined}
          secondaryBtn={<CreateFileBtn subtopicId={searchParams?.id} />}
        />
      </SearchModal>
      <SearchModal
        title="Modificar tópico"
        searchParams={searchParams}
        id="modify-topic"
      >
        <UpdateForm
          endpoint={`topics/${topic?.id}`}
          id={String(topic?.id)}
          name={topic?.name}
          privacity={(Privacity.PRIVATE as Privacity) ?? undefined}
        />
      </SearchModal>
      <SearchModal
        title="Modificar asignatura"
        searchParams={searchParams}
        id="modify-subject"
      >
        <UpdateForm
          endpoint={`subjects/${subject?.id}`}
          id={String(subject?.id)}
          name={subject?.name}
          privacity={(Privacity.PRIVATE as Privacity) ?? undefined}
        />
      </SearchModal>
      <Toaster />
    </>
  );
}
