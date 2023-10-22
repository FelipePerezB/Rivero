import Button from "@components/Button";
import NavigationCard from "@components/cards/navigationCard/NavigationCard";
import ProgressCard from "@components/cards/progressCard/ProgressCard";
import { SubjectWithTopic } from "@components/containers/subjectsCards/SubjectsCards";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Subtopic, Topic } from "@prisma/client";
import LinksAccordion from "src/app/components/accordion/links-accordion";
import Options from "src/app/components/options/options";
import api from "src/app/utils/api";
import capFirst from "src/utils/capFirst";
import Link from "next/link";
import { NoteWithFile } from "../../models/note";
import { auth } from "@clerk/nextjs";
import EvaluationsBtn from "./components/evaluations-btn";
import { Suspense } from "react";
// import { Toaster } from "react-hot-toast";
// import Form from "./components/form";
// import dynamic from "next/dynamic";

interface SubtopicWithNotes extends Subtopic {
  Notes: NoteWithFile[];
}
interface TopicWithSubtopic extends Topic {
  Subtopics: SubtopicWithNotes[];
}

// const ModifyBtn = ({ href, canEdit }: { href: string; canEdit: boolean }) =>
//   canEdit ? (
//     <Link href={href}>
//       <FontAwesomeIcon className="h-3 w-3" icon={faPen} />
//     </Link>
//   ) : (
//     <></>
//   );

export default async function TopictPage({
  params,
}: {
  params: {
    subject: string;
    topic: string;
  };
}) {
  const { data: topic } = (await api(`topics/${params.topic}`, {}, [
    `topics/${params?.topic}`,
    "subtopics",
  ])) as {
    data: TopicWithSubtopic;
  };

  const { data: subtopics } = (await api(`subtopics?topic=${topic?.id}`, {}, [
    `topics/${params?.topic}`,
    ...topic.Subtopics.map(({ id }) => `subtopics/${id}`),
  ])) as {
    data: SubtopicWithNotes[];
  };

  const { data: subject } = (await api(`subjects/${params.subject}`, {}, [
    `topics/${params?.topic}`,
    "subjects",
  ])) as {
    data: SubjectWithTopic;
  };

  const topics = subject.Topics;
  // const canEdit = searchParams.modify === "true";
  // const Form = false
  //   ? dynamic(() => import(`./components/form`), { ssr: false })
  //   : () => <></>;

  return (
    <>
      <h3 className="text-2xl font-bold">{capFirst(subject?.name)}</h3>
      <div className="flex gap-4 w-full md:gap-8 lg:gap-16">
        {/* <NavigationCard href={`evaluations/all`}>Evaluaciones</NavigationCard> */}
        <Suspense fallback={<NavigationCard href="/">Evaluaciones</NavigationCard>}>
          <EvaluationsBtn />
        </Suspense>
        <NavigationCard href={`practice`}>Prácticar</NavigationCard>
      </div>
      <section className="grid sm:grid-rows-[3rem,1fr] sm:grid-cols-2 md:gap-x-8 lg:gap-x-16 gap-x-4 gap-y-2 mt-2">
        <div className="h-max">
          <Options
            option={params?.topic}
            options={topics?.map(({ name, id }) => ({
              title: capFirst(name),
              key: id,
            }))}
          />
        </div>
        <div className="sm:row-start-2 sm:col-start-2">
          <ProgressCard color="red" subject="Matemática" topic="Algebra">
            {/* <div className="flex items-center gap-3">
              <h3 className={"text-2xl font-semibold"}> */}
            {capFirst(topic?.name)}
            {/* </h3> */}
            {/* <ModifyBtn
                canEdit={canEdit}
                href={`?modal=edit&name=${topic?.name}&privacity=${Privacity.PRIVATE}&type=topic&id=${topic?.id}`}
              /> */}
            {/* </div> */}
          </ProgressCard>
        </div>
        <div className="sm:row-start-1 sm:col-start-1 sm:col-end-2 sm:row-end-2 flex flex-col gap-2.5 mt-2 w-full max-w-lg">
          <div className="flex pb-2.5 justify-between items-center">
            <h3 className="text-xl inline-block w-max font-semibold">Temas</h3>
            <div className="flex gap-4">
              {
                <Button>
                  Modificar <FontAwesomeIcon className="w-3 h-3" icon={faPen} />
                </Button>
              }
            </div>
          </div>
          {subtopics?.map(({ name, Notes }) => (
            <LinksAccordion
              key={"AA"}
              content={Notes?.map(({ File: { externalId, title }, id }) => ({
                title,
                href: externalId,
                // : `?modal=edit&name=${title}&privacity=${Privacity.PRIVATE}&type=note&id=${id}`,
              }))}
              summary={capFirst(name)}
              // <span className="flex w-full items-center justify-between gap-3 pr-3">
              //    <span className="flex gap-2">
              //     <ModifyBtn
              //       canEdit={canEdit}
              //       href={`?modal=edit&name=${name}&privacity=${Privacity.PRIVATE}&type=subtopic&id=${id}`}
              //     />
              //   </span>
              // </span>
            />
          ))}
        </div>
      </section>
      {/* <SearchModal id="edit" searchParams={searchParams} title="Modificar">
        <Form searchParams={searchParams} />
      </SearchModal> */}
      {/* <Toaster /> */}
    </>
  );
}
