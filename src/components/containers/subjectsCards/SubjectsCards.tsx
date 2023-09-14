import styles from "@styles/Docs.module.css";
import Card from "@components/Card";
import { CompletedProgress } from "@components/ProgressVar";
import { GetSubjectsQuery } from "src/gql/graphql";
import capFirst from "src/utils/capFirst";
import getDocsProgress from "src/utils/getDocsProgress";
import Tags from "@components/tags/Tags";
import { useEffect, useState } from "react";

export default function SubjectsCards({
  subjecsData,
}: {
  subjecsData: GetSubjectsQuery;
}) {
  const [stats, setStats] = useState<{
    [subject: string]: { [topic: string]: string };
  }>({});
  useEffect(() => {
    const strStats = localStorage.getItem("subjects-stats");
    if (!strStats) return;
    setStats(JSON.parse(strStats));
  }, []);
  const subjects = subjecsData.subjects;
  return (
    <>
      {subjects?.map(({ name, Topics, color, _count: { Docs: count }, id }) => {
        const tags = Topics?.map((topic) => topic.name);
        if (!(count > 0) || !tags?.length) return;
        const progress = getDocsProgress(name, count, stats);
        const label = `${count} documentos`;
        const key = "card-" + name;
        const href = `docs/${id}`;
        return (
          <Card key={key} href={href} className={styles.card}>
            <h2>{capFirst(name)}</h2>
            <Tags tags={tags} />
            <CompletedProgress {...{ label, progress, color }} />
          </Card>
        );
      })}
    </>
  );
}
