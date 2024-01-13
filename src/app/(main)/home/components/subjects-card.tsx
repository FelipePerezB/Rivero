// import Card from "@components/Card";
import capFirst from "src/utils/capFirst";
// import Tags from "@components/tags/Tags";
import { Subject, Topic } from "@prisma/client";
import { LessonWithFile } from "../../subjects/models/lesson";
import Card from "@components/cards/Card";
import Tags from "@components/common/tags/Tags";
import { SubjectWithTopic } from "../../subjects/models/subject";
import {
  CompletedProgress,
  ProgressVar,
} from "@components/dashboard/progress-bar/ProgressVar";
// import { NoteWithFile } from "src/app/subjects/models/note";

// export interface SubjectWithTopic extends Subject {
//   Topics: Topic[];
//   lesson: LessonWithFile[];
// }
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
        ? `/subjects/${id}/${topicId}`
        : "";
    return (
      <Card
        interactive
        key={key}
        href={href}
        className="max-w-[250px] flex flex-col gap-1"
      >
        <h3 className="text-xl font-medium">{capFirst(name)}</h3>
        <div>
          <CompletedProgress progress={60} />
          <Tags tags={tags} />
        </div>
      </Card>
    );
  });
}
