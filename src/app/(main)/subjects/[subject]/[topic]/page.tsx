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

  const { data: topics } = (await api(`topics?subject=${subjectId}`, {}, [
    `subjects/${subjectId}`,
  ])) as {
    data: Topic[];
  };
  const storageProgress = await getProgress(subjectId);
  let progressFilesCount = 0;
  if (storageProgress && typeof storageProgress === "object") {
    const topicProgress = storageProgress[Number(topicId)];

    const storageFilesIds = Object.values(topicProgress).flatMap((id) => id);
    const avalibleIds = storageFilesIds.filter((id) => ids.includes(id));

    progressFilesCount =
      typeof topicProgress === "object" ? avalibleIds.length : 0;
  }

  const havePractice = !!practice?.File?.externalId;
  const avalibleFiles = subtopics.flatMap(({ Lesson }) =>
    Lesson?.map(({ File }) => File).filter(
      ({ privacity }) => privacity === "PUBLIC"
    )
  );
  const ids = avalibleFiles.map(({ externalId }) => externalId);
  const user = await getUser();
  const role = user?.publicMetadata?.role as Role;

  const organization = user?.publicMetadata?.organizationId;

  const firstBtn = {
    [Role.ADMIN]: {
      href: `/dashboard/subjects/${subjectId}/${topicId}`,
      name: "Modificar asignatura",
    },
    [Role.TEACHER]: {
      href: `evaluations/${organization}/all`,
      name: "Evaluaciones",
    },
    [Role.STUDENT]: {
      href: `/dashboard/subjects/${subjectId}/${topicId}`,
      name: "Resumen de resultados",
    },
  } as {
    [role: string]: {
      href: string;
      name: string;
    };
  };

  return (
    <>
      <h3 className="text-2xl font-bold">{capFirst(subject?.name)}</h3>
      <div className="flex gap-4 w-full md:gap-8 lg:gap-16">
        <NavigationCard href={firstBtn[role].href}>
          {firstBtn[role].name}
        </NavigationCard>
        <NavigationCard href={havePractice ? "practice" : ""}>
          {havePractice ? "Prácticar" : "Práctica proximamente"}
        </NavigationCard>
      </div>
      <section className="grid sm:grid-rows-[3rem,1fr] sm:grid-cols-2 md:gap-x-8 lg:gap-x-16 gap-x-4 gap-y-2 mt-2">
        <Options
          option={topicId}
          options={topics?.map(({ name, id }) => ({
            title: capFirst(name),
            key: id,
          }))}
        />
        <div className="flex justify-center sm:row-start-2 sm:col-start-2">
          <ProgressCard
            completed={progressFilesCount}
            count={ids?.length}
            color="red"
            subject="Matemática"
            topic="Algebra"
          >
            Progreso
          </ProgressCard>
        </div>
        <div className="sm:row-start-1 sm:col-start-1 sm:col-end-2 sm:row-end-2 flex flex-col gap-2.5 mt-2 w-full">
          <div className="flex pb-2.5 justify-between items-center">
            <h3 className="text-xl inline-block w-max font-semibold">Temas</h3>
            <Button href="/">
              Resumen <FontAwesomeIcon className="h-3 w-3" icon={faStar} />
            </Button>
          </div>
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
        </div>
      </section>
    </>
  );
}
