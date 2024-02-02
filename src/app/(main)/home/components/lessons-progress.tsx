import { Subject } from "@prisma/client";
import React, { ReactNode, Suspense } from "react";
import { SubjectWithTopic } from "../../subjects/models/subject";
import getProgress from "src/services/cache/getProgress";
import SmallTitle from "@components/common/titles/small-title";
import Card from "@components/cards/Card";
// import { Item } from "../page";
import AllScores from "./stats/all-scores";
import PracticeItem from "./stats/practice-item";
import RowSkeleton from "@components/layout/loading-skeleton/row-skeleton/row-skeleton";
import XsSkeleton from "@components/layout/loading-skeleton/xs-skeleton";
import BarsChart from "@components/dashboard/charts/bars/bars";
import Item from "@components/dashboard/item";
import api from "src/utils/api";

type InputObject = Record<string, Record<string, Record<string, string>>>;
export function countIdInTopic(topicProgress: {
  [subtopicId: number]: {
    [id: string]: string;
  };
}) {
  console.log(topicProgress);
  const result: Record<string, number> = {};
  for (const subtopicId in topicProgress) {
    const subtopic = topicProgress[subtopicId];

    for (const id in subtopic) {
      const date = subtopic[id];

      if (result[date]) {
        result[date]++;
      } else {
        result[date] = 1;
      }
    }
  }
  return result;
}

export function countIdInSubject(
  subjectProgress: InputObject
): Record<string, number> {
  const result: Record<string, number> = {};

  for (const topicId in subjectProgress) {
    const topic = subjectProgress[topicId];
    Object.entries(countIdInTopic(topic)).map(([date, value]) =>
      Object.assign(result, {
        ...result,
        [date]: typeof result[date] === "number" ? result[date] + value : value,
      })
    );
  }

  return result;
}

type InputArray = Array<Record<string, Record<string, number>>>;

type OutputObject = { time: string; value: number };

function transformArray(input: InputArray): OutputObject[] {
  const result: Record<string, number> = {};

  for (const item of input) {
    for (const key in item) {
      const innerObject = item[key];

      for (const date in innerObject) {
        const count = innerObject[date];

        if (result[date]) {
          result[date] += count;
        } else {
          result[date] = count;
        }
      }
    }
  }

  const outputArray: OutputObject[] = Object.keys(result).map((time) => ({
    time,
    value: result[time],
  }));

  return outputArray;
}

export default async function LessonProgress() {
  const { subjects } = (await api("subjects", {}, ["subjects"])) as {
    subjects: SubjectWithTopic[];
  };
  const progressBySubject = await Promise.all(
    subjects.map(async (subject) => {
      const progress = await getProgress(subject?.id);
      const result = countIdInSubject(progress);
      return { [subject?.id]: result };
    })
  );

  const date = new Date();
  const currentDate = date.toISOString().split("T")[0];
  const result = transformArray(progressBySubject);
  const lessonsToday =
    result.find(({ time }) => time === currentDate)?.value ?? 0;

  const weekLessons =
    result
      ?.filter(({ time, value }) => {
        const startDate = new Date(time).getTime();
        const endDate = new Date(currentDate).getTime();
        const weekTime = 60 * 1000 * 60 * 60 * 24 * 7;
        return weekTime > startDate - endDate;
      })
      ?.map(({ time, value }) => value)
      ?.reduce((a, b) => a + b, 0) ?? 0;

  const mounthLessons =
    result
      ?.filter(({ time, value }) => {
        const startDate = new Date(time).getTime();
        const endDate = new Date(currentDate).getTime();
        const weekTime = 60 * 1000 * 60 * 60 * 24 * 7 * 4;
        return weekTime > startDate - endDate;
      })
      ?.map(({ time, value }) => value)
      ?.reduce((a, b) => a + b, 0) ?? 0;

  return (
    <>
      <div className="flex flex-col w-full h-40 sm:h-full">
        <SmallTitle>Resumen semanal</SmallTitle>
        <BarsChart
          minSize={7}
          data={result.map(({ time, value }) => {
            const dateSplit = time.split("-");
            const label = `${dateSplit.at(2)}/${dateSplit.at(1)}`;
            return {
              label,
              value,
            };
          })}
        />
      </div>
      <div className="hidden md:flex flex-col gap-sm justify-center">
        <div className="flex gap-sm items-start">
          <Item subtitle="Lecciones hoy" title={lessonsToday} />
          <Item subtitle="Lecciones esta semana" title={weekLessons} />
          <Item subtitle="Lecciones este mes" title={mounthLessons} />
        </div>
        <div className="flex gap-sm">
          <Suspense
            fallback={<Item subtitle="Prácticas" title={<XsSkeleton />} />}
          >
            <PracticeItem subjects={subjects} />
          </Suspense>
          <Suspense
            fallback={
              <>
                <Item subtitle="Puntajes" title={<XsSkeleton />} />
                <Item subtitle="'Ultimo puntaje" title={<XsSkeleton />} />
              </>
            }
          >
            <AllScores />
          </Suspense>
        </div>
      </div>
    </>
  );
}
