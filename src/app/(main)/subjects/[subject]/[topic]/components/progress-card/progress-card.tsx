"use client";
import Card from "@components/cards/Card";
import { CompletedProgress } from "@components/dashboard/progress-bar/ProgressVar";
import React, { ReactNode, useEffect, useState } from "react";
export default function ProgressCard({
  completed,
  color = "var(--primary-color)",
  count = 1,
  subject,
  topic,
  children,
}: {
  completed: number,
  children?: ReactNode | ReactNode[] | string | undefined;
  topic?: string;
  subject: string;
  color: string;
  count?: number;
}) {
  // const [stats, setStats] = useState();

  // useEffect(() => {
  //   const strStats = localStorage.getItem("subjects-stats");
  //   if (!strStats) return;
  //   setStats(JSON.parse(strStats));
  // }, []);

  const getProgress = (): number => {
    // if (!stats || !count || !topic) return 0;
    // const subjectStats = stats[subject];
    // if (!subjectStats) return 0;
    // const topicStats = subjectStats[topic] as string[] | undefined;
    // if (!topicStats) return 0;

    // let completedDocs = topicStats.length;
    const progress =
      completed > 0
        ? Number(((100 * completed) / count).toFixed(1))
        : 0;
    return progress;
  };

  return topic ? (
    <Card className="flex flex-col items-start max-w-md">
      {children}
      <div className="w-full flex flex-col gap-3">
        <CompletedProgress color={color} progress={getProgress()} />
        <span className="w-full text-end m-0">{count} documentos</span>
      </div>
    </Card>
  ) : (
    <></>
  );
}
