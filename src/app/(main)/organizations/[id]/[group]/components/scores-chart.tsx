import BarsChart from "@components/dashboard/charts/bars/bars";
import { Score } from "@prisma/client";
import React from "react";
import { formatWithoutGroupScores } from "src/utils/format/formatScores";

export default function ScoresChart({ scores }: { scores: Score[] }) {
  const data = formatWithoutGroupScores(scores) ?? {};

  return (
    <BarsChart
      minSize={5}
      data={data.map(({ time, value }) => {
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
