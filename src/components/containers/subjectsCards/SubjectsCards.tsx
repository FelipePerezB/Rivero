import Card from "@components/Card";
import { CompletedProgress, ProgressVar } from "@components/ProgressVar";
import { GetSubjectsQuery } from "src/gql/graphql";
import capFirst from "src/utils/capFirst";
import getDocsProgress from "src/utils/getDocsProgress";
import Tags from "@components/tags/Tags";
import EditButton from "@components/button/editButton/EditButton";
import updateSubject from "src/service/querys/subject/updateSubject";
import removeSubject from "src/service/querys/subject/removeSubject";
import createTopic from "src/service/querys/topic/createTopic";

export default function SubjectsCards({
  subjecsData,
  // stats,
  redirect = true,
  editMode = false,
}: {
  editMode?: boolean;
  redirect?: boolean;
  stats?: {
    [subject: string]: { [topic: string]: string };
  };
  subjecsData?: GetSubjectsQuery;
}) {
  const subjects = subjecsData?.subjects;
  return (
    <>
      {subjects?.map(({ name, Topics, color, id }) => {
        const tags = Topics?.map((topic) => topic.name);
        // const progress = getDocsProgress(name, stats);
        // const label = `${count} documentos`;
        const key = "card-" + name;
        const href =
          Topics?.length && redirect && !editMode ? `/docs/${id}` : "";
        return (
          <Card
            interactive
            key={key}
            href={href}
            className="sm:w-56 bg-red grid grid-cols-[3px,1fr] gap-3 overflow-hidden hover:bg-slate-50"
          >
            <div
              // style={{ background: color }}
              className="w-full h-full bg-blue-500 rounded-full"
            ></div>
            <div className="sm:w-52 overflow-hidden">
              {/* <article className="flex items-center gap-1"> */}
              <h3 className="text-lg font">{capFirst(name)}</h3>
              {/* </article> */}
              <Tags tags={tags} />
            </div>
          </Card>
        );
      })}
    </>
  );
}
