import BarsChart from "@components/dashboard/charts/bars";
import { Subject } from "@prisma/client";
import React from "react";
import { SubjectWithTopic } from "../../subjects/models/subject";
import getProgress from "src/services/cache/getProgress";
import SmallTitle from "@components/common/titles/small-title";
import Card from "@components/cards/Card";
import { Item } from "../page";

type InputObject = Record<string, Record<string, Record<string, string>>>;

function countIdsByDate(input: InputObject): Record<string, number> {
  const result: Record<string, number> = {};

  for (const outerKey in input) {
    for (const innerKey in input[outerKey]) {
      const innerObject = input[outerKey][innerKey];

      for (const id in innerObject) {
        const date = innerObject[id];

        if (result[date]) {
          result[date]++;
        } else {
          result[date] = 1;
        }
      }
    }
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

function filterObjectsThisWeek(objects: OutputObject[]): OutputObject[] {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentWeek = getISOWeek(currentDate);

  function getISOWeek(date: Date): number {
    const januaryFirst = new Date(date.getFullYear(), 0, 1);
    const daysOffset = januaryFirst.getDay() - 1; // Adjust to Monday-based week
    const firstMonday = new Date(januaryFirst.getTime());
    firstMonday.setDate(
      januaryFirst.getDate() + (daysOffset > 0 ? 7 - daysOffset : daysOffset)
    );

    const days = Math.floor(
      (date.getTime() - firstMonday.getTime()) / (24 * 60 * 60 * 1000)
    );
    const weekNumber = Math.ceil((days + 1) / 7);

    return weekNumber;
  }

  const filteredObjects = objects.filter((obj) => {
    const objDate = new Date(`${currentYear}-${obj.time}`);
    const objWeek = getISOWeek(objDate);

    return objWeek === currentWeek;
  });

  return filteredObjects;
}

export default async function LessonProgress({
  subjects,
}: {
  subjects: SubjectWithTopic[];
}) {
  const progressBySubject = await Promise.all(
    subjects.map(async (subject) => {
      const progress = await getProgress(subject?.id);
      const result = countIdsByDate(progress);
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
      ?.reduce((a, b) => a + b) ?? 0;

  const mounthLessons =
    result
      ?.filter(({ time, value }) => {
        const startDate = new Date(time).getTime();
        const endDate = new Date(currentDate).getTime();
        const weekTime = 60 * 1000 * 60 * 60 * 24 * 7 * 4;
        return weekTime > startDate - endDate;
      })
      ?.map(({ time, value }) => value)
      ?.reduce((a, b) => a + b) ?? 0;

  return (
    <Card className="flex h-full">
      <div className="flex flex-col w-full h-40 sm:h-full">
        <SmallTitle>Resumen</SmallTitle>
        <BarsChart
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
        <div className="flex gap-sm">
          <Item subtitle="Lecciones hoy" title={lessonsToday} />
          <Item subtitle="Lecciones esta seman" title={weekLessons} />
          <Item subtitle="Lecciones este mes" title={mounthLessons} />
        </div>
        <div className="flex gap-sm">
        <Item subtitle="Practicas hoy" title="14" />
        <Item subtitle="Practicas hoy" title="14" />
        <Item subtitle="Practicas esta semana" title="11" />

        </div>
      </div>
    </Card>
  );
}
