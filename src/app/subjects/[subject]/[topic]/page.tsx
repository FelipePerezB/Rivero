import NavigationCard from "@components/cards/navigationCard/NavigationCard";
import ProgressCard from "@components/cards/progressCard/ProgressCard";
import { SubjectWithTopic } from "@components/containers/subjectsCards/SubjectsCards";
import { Subtopic, Topic } from "@prisma/client";
import LinksAccordion from "src/app/components/accordion/links-accordion";
import Options from "src/app/components/options/options";
import api from "src/app/utils/api";
import capFirst from "src/utils/capFirst";
import { NoteWithFile } from "../../models/note";
import EvaluationsBtn from "./components/evaluations-btn";
import { Suspense } from "react";
import ModifyBtn from "./components/modify-btn";
import PracticeBtn from "./components/practice-btn";
import { Toaster } from "react-hot-toast";

interface SubtopicWithNotes extends Subtopic {
  Notes: NoteWithFile[];
}
interface TopicWithSubtopic extends Topic {
  Subtopics: SubtopicWithNotes[];
}

export default async function TopictPage({
  params: { subject: subjectId, topic: topicId },
}: {
  params: {
    subject: string;
    topic: string;
  };
}) {
  const { data: topic } = (await api(`topics/${topicId}`, {}, [
    `topics/${topicId}`,
    "subtopics",
  ])) as {
    data: TopicWithSubtopic;
  };

  const { data: subtopics } = (await api(`subtopics?topic=${topic?.id}`, {}, [
    `topics/${topicId}`,
    ...topic.Subtopics.map(({ id }) => `subtopics/${id}`),
  ])) as {
    data: SubtopicWithNotes[];
  };

  const { data: subject } = (await api(`subjects/${subjectId}`, {}, [
    `topics/${topicId}`,
    "subjects",
  ])) as {
    data: SubjectWithTopic;
  };

  const { data: practice } = (await api(`notes/practice/${subjectId}`, {}, [
    `practice/${subjectId}`,
  ])) as {
    data: NoteWithFile;
  };

  const { data: topics } = (await api(`topics?subject=${subjectId}`, {}, [
    `subjects/${subjectId}`,
  ])) as {
    data: Topic[];
  };

  // const practice = subject?.Notes[0]?.File;

  return (
    <>
      <h3 className="text-2xl font-bold">{capFirst(subject?.name)}</h3>
      <div className="flex gap-4 w-full md:gap-8 lg:gap-16">
        <Suspense
          fallback={<NavigationCard href="">Evaluaciones</NavigationCard>}
        >
          <EvaluationsBtn />
        </Suspense>
        {!!practice?.File?.externalId ? (
          <NavigationCard href="practice">
            Prácticar
          </NavigationCard>
        ) : (
          <Suspense fallback={<div className="w-full"></div>}>
            <PracticeBtn subject={subjectId}/>
          </Suspense>
        )}
        
      </div>
      <section className="grid sm:grid-rows-[3rem,1fr] sm:grid-cols-2 md:gap-x-8 lg:gap-x-16 gap-x-4 gap-y-2 mt-2">
        <div className="h-max">
          <Options
            option={topicId}
            options={topics?.map(({ name, id }) => ({
              title: capFirst(name),
              key: id,
            }))}
          />
        </div>
        <div className="flex justify-center sm:row-start-2 sm:col-start-2">
          <ProgressCard color="red" subject="Matemática" topic="Algebra">
            Progreso:
          </ProgressCard>
        </div>
        <div className="sm:row-start-1 sm:col-start-1 sm:col-end-2 sm:row-end-2 flex flex-col gap-2.5 mt-2 w-full">
          <div className="flex pb-2.5 justify-between items-center">
            <h3 className="text-xl inline-block w-max font-semibold">Temas</h3>
            <div className="flex gap-4">
              <Suspense>
                <ModifyBtn subject={subjectId} topic={topicId} />
              </Suspense>
            </div>
          </div>
          {subtopics?.map(({ name, Notes }) => (
            <LinksAccordion
              key={"AA"}
              content={Notes?.map(({ File: { externalId, name }, id }) => ({
                name,
                href: `document/${externalId}`,
              }))}
              summary={capFirst(name)}
            />
          ))}
        </div>
      </section>
     
    </>
  );
}
