import { Privacity, Subtopic, Topic } from "@prisma/client";
import LinksAccordion from "@components/accordion/links-accordion";
import api from "src/utils/api";
import { LessonWithFile } from "../../models/lesson";
import EvaluationsBtn from "./components/evaluations-btn";
import capFirst from "src/utils/capFirst";
import { documentsLink } from "src/app/constants/urls/documents";
import Section from "@components/containers/section";
import LinkCard from "@components/navigation/link-card";
import SmallTitle from "@components/common/titles/small-title";
import Card from "@components/cards/Card";
import SubjectStats from "./components/stats/subject-stats";
import { Suspense } from "react";
import ChartSkeleton from "@components/layout/loading-skeleton/chart-skeleton";
import LargeSkeleton from "@components/layout/loading-skeleton/large-skeleton/large-skeleton";
import { SubjectTitle } from "src/app/(main)/components/common/subject-title";
import {
  TopicsList,
  TopicsListWithSuspense,
} from "@components/navigation/options/topics-list";
// import SubjectTitle from "src/app/(main)/components/common/subject-title";
// import TopicsList from "@components/navigation/options/topics-list";

interface SubtopicWithLessons extends Subtopic {
  Lesson: LessonWithFile[];
}

export default async function TopictPage({
  params: { subject: subjectId, topic: topicId },
}: {
  params: {
    subject: string;
    topic: string;
  };
}) {
  return (
    <>
      <Section>
        <SubjectTitle
          subjectId={subjectId}
          subtitle="Administra la asignatura"
        />
        <div className="flex gap-md  md:gap-lg overflow-x-auto">
          <EvaluationsBtn subject={subjectId} topic={topicId} />
          <LinkCard
            href={`practice`}
            description="Refuerza los contenidos aprendidos"
            title="Práctica"
          />
          <LinkCard
            href=""
            description="Mira un resumen de la asignatura"
            title="Resumen"
          />
        </div>
        <article className="flex flex-col sm:flex-row-reverse justify-between w-full gap-lg">
          <section className="flex flex-col gap-sm w-full">
            <TopicsListWithSuspense {...{ subjectId, topicId }} />
            <Card className="flex flex-col gap-sm">
              <div className="flex flex-col gap-1 h-40 w-full">
                <SmallTitle>Puntajes</SmallTitle>
                <Suspense fallback={<ChartSkeleton />}>
                  <SubjectStats subject={subjectId} />
                </Suspense>
              </div>
            </Card>
          </section>

          <section className="flex flex-col gap-sm md:gap-md w-full">
            <SmallTitle>Temas</SmallTitle>
            <Suspense
              fallback={
                <>
                  <Card>
                    <LargeSkeleton className="p-0 m-0" />
                  </Card>
                  <Card>
                    <LargeSkeleton className="p-0 m-0" />
                  </Card>
                </>
              }
            >
              <SubtopicsAccordion topicId={topicId} />
            </Suspense>
          </section>
        </article>
      </Section>
    </>
  );
}

const SubtopicsAccordion = async ({ topicId }: { topicId: string }) => {
  const { data: subtopics } = (await api(`topics/${topicId}/subtopics`, {}, [
    `topics/${topicId}`,
    `files/${topicId}`,
  ])) as {
    data: SubtopicWithLessons[];
  };
  return subtopics?.map(({ name, Lesson, privacity }, i) => {
    if (privacity !== Privacity.PUBLIC) return <></>;
    return (
      <LinksAccordion
        key={`topic-${name}-${i}`}
        content={Lesson?.filter(({ File }) => {
          const filePrivacity = File?.privacity;
          return filePrivacity === Privacity.PUBLIC;
        }).map(({ File: { externalId, name } }) => ({
          name,
          href: `${documentsLink}/lessons/${externalId}`,
        }))}
        summary={capFirst(name)}
      />
    );
  });
};
