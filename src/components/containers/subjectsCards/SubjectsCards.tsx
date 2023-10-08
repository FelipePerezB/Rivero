import Card from "@components/Card";
import capFirst from "src/utils/capFirst";
import Tags from "@components/tags/Tags";
import { Subject, Topic } from "@prisma/client";

export interface SubjectWithTopic extends Subject {
  Topics: Topic[];
}
export default function SubjectsCards({
  subjects,
  redirect = true,
  editMode = false,
}: {
  editMode?: boolean;
  redirect?: boolean;
  stats?: {
    [subject: string]: { [topic: string]: string };
  };
  subjects: SubjectWithTopic[];
}) {
  return subjects?.map(({ name, Topics, id }) => {
        const tags = Topics?.map((topic) => topic.name);
        const topicId = Topics?.at(0)?.id;
        const key = "card-" + name;
        const href =
          Topics?.length && redirect && !editMode
            ? `/documents/${id}/${topicId}`
            : "";
        return (
          <Card
            interactive
            key={key}
            href={href}
            className="sm:w-56 bg-red grid grid-cols-[3px,1fr] gap-3 overflow-hidden hover:bg-slate-50"
          >
            <div className="w-full h-full bg-blue-500 rounded-full"></div>
            <div className="sm:w-52 overflow-hidden">
              <h3 className="text-lg font">{capFirst(name)}</h3>
              <Tags tags={tags} />
            </div>
          </Card>
        );
      })}
