import BarsChart from "@components/dashboard/charts/bars/bars";
import { Score } from "@prisma/client";
import React from "react";

type TimeObject = {
  time: string;
  value: number;
};

type GroupedObject = {
  time: string;
  value: number;
};

function groupAndSortByTime(data: TimeObject[]): GroupedObject[] {
  // Creamos un objeto para almacenar la cantidad de elementos por fecha
  const groupedData: { [key: string]: number } = {};
  // Iteramos sobre el arreglo de datos y contamos la cantidad de elementos por fecha
  data.forEach((item) => {
    if (groupedData[item.time]) {
      groupedData[item.time] = groupedData[item.time] + 1;
    } else {
      groupedData[item.time] = 1;
    }
  });

  // Convertimos el objeto en un arreglo de objetos con la estructura deseada
  const result: GroupedObject[] = Object.keys(groupedData).map((time) => ({
    time,
    value: groupedData[time],
  }));

  // Ordenamos el arreglo por fecha de menor a mayor
  result.sort((a, b) => (a.time < b.time ? -1 : 1));

  return result;
}

export default function ScoresChart({ scores }: { scores: Score[] }) {
  const array = scores.map(({ score, updateAt }) => ({
    time: (updateAt as unknown as string).split("T")[0],
    value: score,
  }));

  // const flatArray = Object.values(scores).flat(2);
  const formatScores = groupAndSortByTime(array);

  return (
    <BarsChart
      minSize={5}
      data={formatScores.map(({ time, value }) => {
        const dateSplit = time.split("-");
        const label = `${dateSplit.at(2)}/${dateSplit.at(1)}`;
        return {
          label,
          value,
        };
      })}
    />
  );
}
