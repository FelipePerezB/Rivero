import { Score } from "@prisma/client";
import getAvg from "../maths/getAvg";

export interface ScoresWithGroup extends Score {
  User: {
    Group: {
      id: number;
    };
  };
}

export default function formatScores(scores: ScoresWithGroup[]) {
  const unformattedData: { [groupId: string]: { [time: string]: number[] } } = {};

  scores?.forEach(({ score, updateAt, User: { Group } }) => {
    const unformattedTime = updateAt as unknown as string;
    const time = unformattedTime.split("T")[0];
    const groupId = Group?.id;

    if (!groupId) return;

    const group = unformattedData[groupId] || {};
    const date = group[time] || [];
    group[time] = [...date, score];
    unformattedData[groupId] = group;
  });

  const formattedData: { [group: string]: { value: number; time: string }[] } = {};

  Object.entries(unformattedData).forEach(([group, dates]) => {
    formattedData[group] = Object.entries(dates).map(([time, values]) => ({
      time,
      value: getAvg(values),
    }));
  });

  return formattedData;
}
export function formatWithoutGroupScores(scores: Score[]) {
  const unFormatedData = {} as { [time: string]: number[] };

  scores?.forEach(({ score, updateAt }) => {
    const unFormatedTime = updateAt as unknown as string;
    const time = unFormatedTime.split("T")[0];
    const dateData = unFormatedData[time];
    unFormatedData[time] = dateData ? [...dateData, score] : [score];
  });
  const data = Object.entries(unFormatedData).map(([time, scores]) => ({
    time,
    value: getAvg(scores),
  }));
  return data;
}
