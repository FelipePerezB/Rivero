import api from "src/utils/api";
import { File, Lesson } from "@prisma/client";
import PracticeEditor from "../practice-editor";

interface LessonWithFile extends Lesson {
  File: File;
}

export default async function PracticePage({
  params: { id },
  searchParams,
}: {
  params: { [key: string]: string };
  searchParams: { [key: string]: string };
}) {
  let file;
  const { data } = (await api("files/" + id, {}, [`files/${id}`])) as {
    data: File;
  };
  if (data?.content)
    file = {
      ...data,
      content: { ...JSON.parse(data.content) },
    };

  // let file;
  // const { data } = (await api(`lessons/${id}`, { cache: "no-store" }, [
  //   `files/${id}`,
  // ])) as {
  //   data: LessonWithFile;
  // };
  //  
  // if (data?.File?.content)
  //   file = {
  //     ...data,
  //     content: { ...JSON.parse(data?.File?.content) },
  //   };

  // const type = Types.DOCUMENT.toLowerCase();
  //  
  // if (typeof file?.content !== "object") return <></>;
  // const content = file.content as WithCoNotemponent["file"]["content"];
  // const metadata = {
  //   subtopicId: data.subtopicId,
  //   topicId: data.topicId,
  //   subjectId: data.subjectId,
  // };

  return (
    <PracticeEditor data={data} id={id} />
    // <EditWraper document={file} id={id} getTemplate={practiceTemplate} />
    // <DynamicElement
    //   attrs={{ ...content, name: type, type, documentId: id, metadata }}
    //   name={type}
    // />
  );
}
// <Practice
// searchParams={{}}
// title="Prácticar"
//   type="document"
//   id=""
//   // searchParams={props.searchParams}
//   // title={file.title}
//   options={{ children: file.content.options.children as [] }}
// />
// <GetComponent
//   attrs={{
//     ...file.content,
//     title: file.title,
//     searchParams: props.searchParams,
//   }}
//   name={"document"}
//   folder="practice"
// />
