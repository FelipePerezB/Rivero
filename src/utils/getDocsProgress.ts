import { useEffect, useState } from "react";

export default function useGetDocsProgress(
  subject: string,
  count: number,
  stats: { [subject: string]: { [topic: string]: string } }
) {
  const getProgress = (
    stats: { [topic: string]: string },
    count: number
  ): number => {
    if (!stats) return 0;
    let completedDocs = 0;
    for (const topic in stats) {
      const docs = stats[topic];
      completedDocs += docs.length;
    }
    const progress =
      completedDocs > 0
        ? Number(((100 * completedDocs) / count).toFixed(1))
        : 0;
    return progress;
  };

  return getProgress(stats[subject], count);
}
