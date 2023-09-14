import Card from "@components/Card";
import { CompletedProgress } from "@components/ProgressVar";
import React, { ReactNode, useEffect, useState } from "react";
import styles from "./ProgressCard.module.css";

export default function ProgressCard({
  color = "var(--primary-color)",
  count = 1,
  subject,
  topic,
  children,
}: {
  children?: ReactNode | ReactNode[] | string | undefined;
  topic?: string;
  subject: string;
  color: string;
  count?: number;
}) {
  const [stats, setStats] = useState();

  useEffect(() => {
    const strStats = localStorage.getItem("subjects-stats");
    if (!strStats) return;
    setStats(JSON.parse(strStats));
  }, []);

  const getProgress = (): number => {
    if (!stats || !count || !topic) return 0;
    const subjectStats = stats[subject];
    if (!subjectStats) return 0;
    const topicStats = subjectStats[topic] as string[] | undefined;
    if (!topicStats) return 0;

    let completedDocs = topicStats.length;
    const progress =
      completedDocs > 0
        ? Number(((100 * completedDocs) / count).toFixed(1))
        : 0;
    return progress;
  };

  return (
    <Card>
      {children && <span className={styles.title}>{children}</span>}
      <div className={styles.stats}>
        <CompletedProgress color={color} progress={getProgress()} />
        <span className={styles.count}>{count} documentos</span>
      </div>
    </Card>
  );
}
