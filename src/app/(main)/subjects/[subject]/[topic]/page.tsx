import { Privacity, Role, Subtopic, Topic } from "@prisma/client";
import LinksAccordion from "@components/accordion/links-accordion";
import api from "src/utils/api";
import { LessonWithFile } from "../../models/lesson";
import EvaluationsBtn from "./components/evaluations-btn";
import { Suspense } from "react";
import ProgressCard from "./components/progress-card/progress-card";
import Options from "@components/navigation/options/options";
import { SubjectWithTopic } from "../../models/subject";
import NavigationCard from "@components/cards/NavigationCard";
import capFirst from "src/utils/capFirst";
import Button from "@components/common/buttons/button/button";
import { documentsLink } from "src/app/constants/urls/documents";
import getProgress from "src/services/cache/getProgress";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import getUser from "src/utils/getUser";
import SectionTitle from "@components/common/titles/section-title";
import Section from "@components/containers/section";
import LinkCard from "@components/navigation/link-card";
import SmallTitle from "@components/common/titles/small-title";
import BarsChart from "@components/dashboard/charts/bars";
import Card from "@components/cards/Card";

interface SubtopicWithLessons extends Subtopic {
  Lesson: LessonWithFile[];
}
interface TopicWithSubtopic extends Topic {
  Subtopics: SubtopicWithLessons[];
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

  console.log(practice)

  const { data: topics } = (await api(`topics?subject=${subjectId}`, {}, [
    `subjects/${subjectId}`,
  ])) as {
    data: Topic[];
  };
  const storageProgress = await getProgress(subjectId);
  let progressFilesCount = 0;
  if (storageProgress && typeof storageProgress === "object") {
    const topicProgress = storageProgress[Number(topicId)];

    // const storageFilesIds = Object.values(topicProgress).flatMap((id) => id);
    // const avalibleIds = storageFilesIds.filter((id) => idsid));

    // progressFilesCount =
    //   typeof topicProgress === "object" ? avalibleIds.length : 0;
  }

  const havePractice = !!practice?.File?.externalId;
  const avalibleFiles = subtopics.flatMap(({ Lesson }) =>
    Lesson?.map(({ File }) => File).filter(
      ({ privacity }) => privacity === "PUBLIC"
    )
  );
  const ids = avalibleFiles.map(({ externalId }) => externalId);
  // const user = await getUser();
  // const role = user?.publicMetadata?.role as Role;

  // const organization = user?.publicMetadata?.organizationId;

  // const firstBtn = {
  //   [Role.ADMIN]: {
  //     href: `/dashboard/subjects/${subjectId}/${topicId}`,
  //     name: "Modificar asignatura",
  //   },
  //   [Role.TEACHER]: {
  //     href: `evaluations/${organization}/all`,
  //     name: "Evaluaciones",
  //   },
  //   [Role.STUDENT]: {
  //     href: `/dashboard/subjects/${subjectId}/${topicId}`,
  //     name: "Evaluaciones",
  //   },
  // } as {
  //   [role: string]: {
  //     href: string;
  //     name: string;
  //   };
  // };

  return (
    <>
      <Section>
        <SectionTitle
          title={capFirst(subject?.name)}
          subTitle="Refuerza y expande tus conocimientos"
        />
        <div className="flex gap-md overflow-x-auto">
          <EvaluationsBtn subject={subjectId} topic={topicId} />
          {havePractice && (
            <LinkCard
              href={`/documents/practice/${practice?.File?.externalId}`}
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
                <SmallTitle>Resumen semanal</SmallTitle>
                {/* <div className="> */}
                <BarsChart
                  data={[
                    { label: "Lu", value: 3 },
                    { label: "Ma", value: 2 },
                    { label: "Mi", value: 1 },
                    { label: "Mi", value: 1 },
                    { label: "Mi", value: 1 },
                    { label: "Mi", value: 1 },
                    { label: "Mi", value: 1 },
                  ]}
                />

                {/* </div> */}
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
      {/* <section className="grid sm:grid-rows-[3rem,1fr] sm:grid-cols-2 md:gap-x-8 lg:gap-x-16 gap-x-4 gap-y-2"></section> */}
    </>
  );
}
