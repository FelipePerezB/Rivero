import Button from "@components/Button";
import Table from "@components/table/Table";
import { faPen, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { File, Note, Privacity } from "@prisma/client";
import React from "react";
import { Toaster } from "react-hot-toast";
import SearchModal from "src/app/components/modal/search-modal";
import Options from "src/app/components/options/options";
import api from "src/app/utils/api";
import capFirst from "src/utils/capFirst";
import CreateAlert from "src/app/components/admin/create-alert/create-alert";
import TableBtn from "@components/table/table-btn/table-btn";
import UpdateForm from "src/app/components/admin/update-form/update-form";
import CreateFileBtn from "./components/create-file-btn/create-file-btn";
import Link from "next/link";
import generateRandomId from "src/app/subjects/utils/generateRandomId";
import { IdLenght } from "src/models/document.model";

export default async function SubjectDashboard({
  params: { id, topic: topicId },
  searchParams,
}: {
  params: { id: string; topic: string };
  searchParams: { [key: string]: string };
}) {
  const { data: topic } = (await api(`topics/${topicId}`, {}, [
    `subjects/${id}`,
    `topics/${topicId}`,
  ])) as {
    data:
      | ({
          Subject: {
            Notes: Note[] & File;
            id: number;
            name: string;
            Topics: {
              id: number;
              name: string;
            }[];
          } | null;
          Subtopics: {
            name: string;
            id: number;
          }[];
        } & {
          id: number;
          name: string;
          subjectId: number | null;
          createdAt: Date | null;
          updateAt: Date | null;
        })
      | null;
  };

  const subject = topic?.Subject;
  const topics = subject?.Topics;
  const subtopics = topic?.Subtopics.map(({ name, id }) => ({ name, id }));

  const Note = subject?.Notes[0] as unknown as { File?: File };

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl text-semibold w-max">
          {capFirst(subject?.name)}
        </h2>
        <span className="flex gap-2">
          <Button href={"?modal=modify-subject"}>Modificar</Button>
          <CreateAlert
            endpoint="topics"
            values={{ subjectId: subject?.id }}
            key={"create-topic-alert"}
          />
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
            <TableBtn href="?modal=modify-topic" key={"edit-btn"}>
              Editar <FontAwesomeIcon className="h-2.5 w-2.5" icon={faPen} />
            </TableBtn>,
            <CreateAlert
              endpoint="subtopics"
              values={{ topicId: topic?.id }}
              key={"create-topic-alert"}
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
      <Button
        href={`/subjects/${subject?.id}/practice/${
          Note?.File?.externalId ?? generateRandomId(IdLenght.lg)
        }`}
      >
        Editar práctica
      </Button>
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
