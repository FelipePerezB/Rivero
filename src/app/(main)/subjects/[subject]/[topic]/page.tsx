import { Privacity, Subtopic, Topic } from "@prisma/client";
import LinksAccordion from "@components/accordion/links-accordion";
import api from "src/utils/api";
import { LessonWithFile } from "../../models/lesson";
import EvaluationsBtn from "./components/evaluations-btn";
import Options from "@components/navigation/options/options";
import { SubjectWithTopic } from "../../models/subject";
import capFirst from "src/utils/capFirst";
import { documentsLink } from "src/app/constants/urls/documents";
import SectionTitle from "@components/common/titles/section-title";
import Section from "@components/containers/section";
import LinkCard from "@components/navigation/link-card";
import SmallTitle from "@components/common/titles/small-title";
import Card from "@components/cards/Card";
import SubjectStats from "./components/stats/subject-stats";
import { Suspense } from "react";
import ChartSkeleton from "@components/layout/loading-skeleton/chart-skeleton";

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
  const { data: subtopics } = (await api(`topics/${topicId}/subtopics`, {}, [
    `topics/${topicId}`,
    `files/${topicId}`,
  ])) as {
    data: SubtopicWithLessons[];
  };

  const { data: subject } = (await api(`subjects/${subjectId}`, {}, [
    `topics/${topicId}`,
    "subjects",
  ])) as {
    data: SubjectWithTopic;
  };

  const { data: practice } = (await api(`lessons/practice/${subjectId}`, {}, [
    `practice/${subjectId}`,
  ])) as {
    data: LessonWithFile;
  };

  const { data: topics } = (await api(`topics?subject=${subjectId}`, {}, [
    `subjects/${subjectId}`,
  ])) as {
    data: Topic[];
  };

  const havePractice = !!practice?.File?.externalId;

  return (
    <>
      <Section>
        <SectionTitle
          title={capFirst(subject?.name)}
          subTitle="Refuerza y expande tus conocimientos"
        />
        <div className="flex gap-md  md:gap-lg overflow-x-auto">
          <EvaluationsBtn subject={subjectId} topic={topicId} />
          {havePractice && (
            <LinkCard
              href={`practice`}
              description="Refuerza los contenidos aprendidos"
              title="Práctica"
            />
          )}
          <LinkCard
            href=""
            description="Mira un resumen de la asignatura"
            title="Resumen"
          />
        </div>
        <article className="flex flex-col sm:flex-row-reverse justify-between w-full gap-lg">
          <section className="flex flex-col gap-sm w-full">
            <Options
              option={topicId}
              options={topics?.map(({ name, id }) => ({
                title: capFirst(name),
                key: id,
              }))}
            />
            <Card className="flex flex-col gap-sm">
              <div className="flex flex-col gap-1 h-40 w-full">
                <SmallTitle>Puntajes</SmallTitle>
                <Suspense fallback={<ChartSkeleton />}>
                  <SubjectStats subject={subjectId} />
                </Suspense>
              </div>
            </Card>
          </section>

          <section className="flex flex-col gap-2.5 w-full">
            <SmallTitle>Temas</SmallTitle>
            {subtopics?.map(({ name, Lesson, privacity }, i) => {
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
            })}
          </section>
        </article>
      </Section>
    </>
  );
}
