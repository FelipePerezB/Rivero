import Card from "@components/Card";
import capFirst from "src/utils/capFirst";
import Tags from "@components/tags/Tags";
import { Subject, Topic } from "@prisma/client";
import { NoteWithFile } from "src/app/subjects/models/note";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import NavigationCard from "@components/cards/navigationCard/NavigationCard";

export interface SubjectWithTopic extends Subject {
  Topics: Topic[];
  Notes: NoteWithFile[];
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
  return subjects?.map(({ name, Topics, id, color }) => {
    const tags = Topics?.map((topic) => topic.name);
    const topicId = Topics?.at(0)?.id;
    const key = "card-" + name;
    const href =
      Topics?.length && redirect && !editMode
        ? `/subjects/${id}/${topicId}`
        : "";
    return (
      <NavigationCard key={`card-${id}`} href={href}>
        {capFirst(name)}
      </NavigationCard>
      // <Card
      //   interactive
      //   key={key}
      //   href={href}
      //   className="bg-red gap-3 hover:bg-gray-50 overflow-hidden"
      // >
      //     <h3 className="text-xl font-semibold pb-0.5">{capFirst(name)}</h3>
      //     <Tags tags={tags} />
      //     <hr className="my-3" />
      //     <div className="flex items-center gap-2.5">
      //       <div className="flex w-full h-1 rounded-full bg-gray-100">
      //         <div
      //           style={{ background: color, width: `${Math.random() * 100}%`  }}
      //           className="h-full bg-blue-500 rounded-full"
      //         ></div>
      //       </div>
      //       <span className="text-xs text-gray-400">65%</span>
      //   </div>
      // </Card>
    );
  });
}
