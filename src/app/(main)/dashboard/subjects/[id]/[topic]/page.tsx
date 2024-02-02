import { Subject, Subtopic, Topic, Types } from "@prisma/client";
import api from "src/utils/api";
import Options from "@components/navigation/options/options";
import Table from "@components/dashboard/table/Table";
import capFirst from "src/utils/capFirst";
import CreateFileBtn from "./[subtopic]/components/create-file-btn/create-file-btn";
import { LessonWithFile } from "src/app/(main)/subjects/models/lesson";
import ItemsBox from "@components/containers/items-box/items-box";
import NavigationCard from "@components/cards/NavigationCard";
import UpdateTopic from "../../../components/update-topic";
import UpdateSubject from "../../../components/update-subject";
import Section from "@components/containers/section";
import SectionTitle from "@components/common/titles/section-title";
import SubTitle from "@components/common/titles/subtitle";
import SmallTitle from "@components/common/titles/small-title";

export default async function SubjectDashboard({
  params: { id: subjectId, topic: topicId },
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

  const { data: subject } = (await api(`subjects/${subjectId}`, {}, [
    `subjects/${subjectId}`,
  ])) as { data: Subject };

  const { data: topics } = (await api(`topics?subject=${subjectId}`, {}, [
    `subjects/${subjectId}`,
  ])) as {
    data: Topic[];
  };

  const { data: evaluations } = (await api(
    `lessons/evaluations/${subjectId}`,
    {},
    [`lessons/${subject?.id}`]
  )) as { data: LessonWithFile[] };

  return (
    <>
      <Section>
        <SectionTitle
          subTitle="Administra la asignatura"
          title={capFirst(subject?.name)}
        />
        <article className="flex justify-between items-center">
          <Options
            options={topics?.map(({ name, id }) => ({
              key: id,
              title: capFirst(name),
            }))}
            option={topicId}
          />
          <div className="flex gap-sm">
            <UpdateSubject searchParams={searchParams} subject={subject} />
            <UpdateTopic searchParams={searchParams} topic={topic} />
          </div>
        </article>
        <Table
          onClickHref={`${topicId}/[id]`}
          data={subtopics?.map(
            ({ name, id, privacity }) => [id, capFirst(name), privacity] ?? []
          )}
          head={{
            title: capFirst(topic?.name),
            keys: [
              { name: "Id", key: "id" },
              { name: "Nombre", key: "name" },
              { name: "Privacidad", key: "privacity" },
            ],
          }}
        />
      </Section>
      <Section>
        <div className="flex justify-between items-center">
          <SmallTitle>Evaluaciones</SmallTitle>
          <CreateFileBtn subjectId={subjectId} type={Types.EVALUATION} text="Nueva evaluación" />
        </div>
        <ItemsBox size="lg">
          {evaluations?.map(({ File: { id, name, externalId } }) => (
            <NavigationCard
              key={`evaluation-${id}`}
              href={`/documents/evaluation/${externalId}`}
            >
              {name}
            </NavigationCard>
          ))}
        </ItemsBox>
      </Section>
    </>
  );
}
