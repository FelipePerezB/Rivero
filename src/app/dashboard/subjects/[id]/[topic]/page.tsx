import Button from "@components/common/buttons/button/button";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Privacity, Subject, Subtopic, Topic } from "@prisma/client";
import SearchModal from "@components/modal/search-modal";
// import Options from "src/app/components/options/options";
import api from "src/utils/api";
import UpdateForm from "@components/admin/update-form/update-form";
// import ItemsBox from "src/app/components/items-box/items-box";
import { NoteWithFile } from "src/app/subjects/models/note";
import DeleteBtn from "@components/admin/delete-btn/delete-btn";
import CreateSubtopic from "./components/create-subtopic/create-subtopic";
import CreateEvaluationBtn from "./components/create-evaluation-btn/create-evaluation-btn";
import Options from "@components/navigation/options/options";
import Table from "@components/dashboard/table/Table";
import TableBtn from "@components/dashboard/table/table-btn/table-btn";
import ItemsBox from "@components/containers/items-box/items-box";
import NavigationCard from "@components/cards/NavigationCard";
import capFirst from "src/utils/capFirst";

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
    `topics/${topicId}`,
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
        <Button>Práctica <FontAwesomeIcon className="h-3 w-3" icon={faPen}/></Button>
      </div>
      <Options
        options={topics?.map(({ name, id }) => ({
          key: id,
          title: capFirst(name),
        }))}
        option={topicId}
      />
      <Table
        onClickHref={`${topicId}/[id]`}
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
        {evaluations?.map(({ File: { id, name } }) => (
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
        title="Modificar tópico"
        searchParams={searchParams}
        id="modify-topic"
      >
        <UpdateForm
          endpoint={`topics/${topic?.id}`}
          id={String(topic?.id)}
          name={topic?.name}
          privacity={(Privacity.PRIVATE as Privacity) ?? undefined}
          secondaryBtn={
            <DeleteBtn endpoint={`topics/${searchParams?.id}`} size="md" />
          }
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
    </>
  );
}
