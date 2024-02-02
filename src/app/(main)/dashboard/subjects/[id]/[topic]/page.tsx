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
import SectionTitle from "@components/common/titles/section-title/section-title";
import SubTitle from "@components/common/titles/subtitle";
import SmallTitle from "@components/common/titles/small-title";
import { TopicsList } from "@components/navigation/options/topics-list";
import { Suspense } from "react";
import Card from "@components/cards/Card";
import LargeSkeleton from "@components/layout/loading-skeleton/large-skeleton/large-skeleton";
import { SubjectTitleWithSkeleton } from "src/app/(main)/components/common/subject-title";
import Button from "@components/common/buttons/button/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPlus } from "@fortawesome/free-solid-svg-icons";
import TableSkeleton from "@components/layout/loading-skeleton/table-skeleton/table-skeleton";
// import TopicsList from "@components/navigation/options/topics-list";

export default async function SubjectDashboard({
  params: { id: subjectId, topic: topicId },
  searchParams,
}: {
  params: { id: string; topic: string };
  searchParams: { [key: string]: string };
}) {
  return (
    <>
      <Section>
        <SubjectTitleWithSkeleton
          subjectId={subjectId}
          subtitle="Administra la asignatura"
        />
        <article className="flex justify-between items-center">
          <TopicsList subjectId={subjectId} topicId={topicId} />
          <div className="flex gap-sm">
            <Suspense fallback={<LargeSkeleton />}>
              <UpdateSubject
                searchParams={searchParams}
                subjectId={subjectId}
              />
              <UpdateTopic searchParams={searchParams} topicId={topicId} />
            </Suspense>
          </div>
        </article>
        <Suspense fallback={<TableSkeleton/>}>
        <TopicTable topicId={topicId} />

        </Suspense>
      </Section>
      <Section>
        <div className="flex justify-between items-center">
          <SmallTitle>Evaluaciones</SmallTitle>
          <CreateFileBtn
            subjectId={subjectId}
            type={Types.EVALUATION}
            text="Nueva evaluación"
          />
        </div>
        <ItemsBox size="lg">
          <Suspense
            fallback={
              <>
                <Card>
                  <LargeSkeleton />
                </Card>
                <Card>
                  <LargeSkeleton />
                </Card>
                <Card>
                  <LargeSkeleton />
                </Card>
                <Card>
                  <LargeSkeleton />
                </Card>
              </>
            }
          >
            <EvaluationList subjectId={subjectId} />
          </Suspense>
        </ItemsBox>
      </Section>
    </>
  );
}

async function EvaluationList({ subjectId }: { subjectId: string }) {
  const { data: evaluations } = (await api(
    `lessons/evaluations/${subjectId}`,
    {},
    [`lessons/${subjectId}`]
  )) as { data: LessonWithFile[] };
  return evaluations?.map(({ File: { id, name, externalId } }) => (
    <NavigationCard
      key={`evaluation-${id}`}
      href={`/documents/evaluation/${externalId}`}
    >
      {name}
    </NavigationCard>
  ));
}

async function TopicTable({ topicId }: { topicId: string }) {
  const { data: subtopics } = (await api(`subtopics?topic=${topicId}`, {}, [
    `topics/${topicId}`,
  ])) as { data: Subtopic[] };
  const { data: topic } = (await api(`topics/${topicId}`, {}, [
    `topics/${topicId}`,
  ])) as {
    data: Topic;
  };
  return (
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
  );
}
