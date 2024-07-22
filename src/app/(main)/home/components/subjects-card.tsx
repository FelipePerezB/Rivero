import capFirst from "src/utils/capFirst";
import Card from "@components/cards/Card";
import Tags from "@components/common/tags/Tags";
import { SubjectWithTopic } from "../../subjects/models/subject";
import api from "src/utils/api";

export default async function SubjectsCards({
  redirect = true,
  editMode = false,
}: {
  editMode?: boolean;
  redirect?: boolean;
  stats?: {
    [subject: string]: { [topic: string]: string };
  };
}) {
  const { subjects } = (await api("subjects", {}, ["subjects"])) as {
    subjects: SubjectWithTopic[];
  };

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
        <Tags tags={tags} />
      </Card>
    );
  });
}
