import NavigationCard from "@components/cards/navigationCard/NavigationCard";
import ProgressCard from "@components/cards/progressCard/ProgressCard";
import { SubjectWithTopic } from "@components/containers/subjectsCards/SubjectsCards";
import { Subtopic, Topic, Note, File } from "@prisma/client";
import LinksAccordion from "src/app/components/accordion/links-accordion";
import Options from "src/app/components/options/options";
import api from "src/app/utils/api";
import capFirst from "src/utils/capFirst";

interface NoteWithFile extends Note {
  file: File;
}
interface SubtopicWithNotes extends Subtopic {
  notes: NoteWithFile[];
}
interface TopicWithSubtopic extends Topic {
  Subtopics: SubtopicWithNotes[];
}

export default async function TopictPage({
  params,
}: {
  params: {
    subject: string;
    topic: string;
  };
}) {
  const { data: topic } = (await api(`topics/${params.topic}`)) as {
    data: TopicWithSubtopic;
  };
  const { data: subject } = (await api(`subjects/${params.subject}`)) as {
    data: SubjectWithTopic;
  };
  const topics = subject.Topics;
  const subtopics = topic.Subtopics;

  return (
    <>
      <h3 className="text-2xl font-bold">{capFirst(subject?.name)}</h3>
      <div className="flex gap-4">
        <NavigationCard href={`evaluations`}>Evaluaciones</NavigationCard>
        <NavigationCard href={`practice`}>
          Prácticar
        </NavigationCard>
      </div>
      <Options
        option={params?.topic}
        options={topics?.map(({ name, id }) => ({
          title: capFirst(name),
          key: id,
        }))}
      />
      <ProgressCard color="red" subject="Matemática" topic="Algebra">
        <div className="flex gap-2 items-center">
          <span>{capFirst(topic?.name)}</span>
        </div>
      </ProgressCard>
      <div className="flex flex-col gap-2.5 mt-2">
        <h3 className="text-lg font-semibold">Temas</h3>
        {subtopics?.map(({ name, notes }) => (
          <LinksAccordion
            key={"AA"}
            content={notes?.map(({ file: { externalId, title } }) => ({
              title,
              href: externalId,
            }))}
            summary={capFirst(name)}
          />
        ))}
        {/* <LinksAccordion content={subtopics} summary="Funciones" />
        <LinksAccordion content={subtopics} summary="Funciones" />
        <LinksAccordion content={subtopics} summary="Funciones" /> */}
      </div>
    </>
  );
}
