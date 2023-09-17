import Card from "@components/Card";
import { CompletedProgress } from "@components/ProgressVar";
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
      {subjects?.map(({ name, Topics, color, _count: { Docs: count }, id }) => {
        const tags = Topics?.map((topic) => topic.name);
        const progress = getDocsProgress(name, count, stats);
        const label = `${count} documentos`;
        const key = "card-" + name;
        const href =
          Topics?.length && redirect && !editMode ? `/docs/${id}` : "";
        return (
          <Card
            interactive
            className="w-full flex flex-col items-start gap-1"
            key={key}
            href={href}
          >
            <section>
              <article className="flex items-center gap-1">
                <h2 className="font-semibold">{capFirst(name)}</h2>
                {editMode && (
                  <EditButton
                    value={name}
                    label="asignatura"
                    childLabel="topico"
                    editMode={editMode}
                    onUpdate={(name) => updateSubject(Number(id), name, color)}
                    onRemove={() => removeSubject(Number(id))}
                    onCreate={(name) => createTopic(name, Number(id))}
                  />
                )}
              </article>
              <Tags tags={tags} />
            </section>
            <section className="flex justify-between w-full gap-4 items-center border-t pt-2 mt-2">
              <div className="h-1.5 bg-slate-100  w-full rounded-full overflow-hidden">
                <div
                  style={{ background: color }}
                  className=" h-full bg-slate-500 w-24 rounded-full"
                ></div>
              </div>
              <span className="text-slate-400 text-xs">97%</span>
            </section>
          </Card>
        );
      })}
    </>
  );
}
