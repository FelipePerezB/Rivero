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
  const unFormatedData = {} as {
    [groupId: string]: { [time: string]: number[] };
  };

  scores?.forEach(({ score, updateAt, User: { Group } }) => {
    const unFormatedTime = updateAt as unknown as string;
    const time = unFormatedTime.split("T")[0];
    const groupId = Group?.id;
    if (!groupId) return;
    const group = unFormatedData[groupId];
    const date = group ? group[time] : [];

    unFormatedData[groupId] = group
      ? { [time]: date ? [...date, score] : [] }
      : { [time]: [score] };
  });

  const data: {
    [group: string]: {
      value: number;
      time: string;
    }[];
  } = Object.entries(unFormatedData).map(([group, dates]) => ({
    [group]: Object.entries(dates).map(([time, values]) => ({
      time,
      value: getAvg(values),
    })),
  }))[0];
  return data;
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
