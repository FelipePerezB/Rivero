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
  stats,
  redirect = true,
  editMode = false,
}: {
  editMode?: boolean;
  redirect?: boolean;
  stats: {
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
          <Card interactive key={key} href={href}>
            <section className="sm:w-44">
              <article className="flex items-center gap-1">
                <h3 className="text-lg font-semibold">{capFirst(name)}</h3>
              </article>
              <Tags tags={tags} />
            </section>
          </Card>
        );
      })}
    </>
  );
}
