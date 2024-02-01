import Bar from "@components/dashboard/charts/bars/bar";
import React, { ReactNode } from "react";

export default function ChartSkeleton() {
  return (
    <div className="flex items-baseline gap-2 animate-pulse h-full w-full">
      <Bar height={80} />
      <Bar height={50} />
      <Bar height={90} />
      <Bar height={65} />
      <Bar height={80} />
      <Bar height={70} />
      <Bar height={90} />
    </div>
  );
}
