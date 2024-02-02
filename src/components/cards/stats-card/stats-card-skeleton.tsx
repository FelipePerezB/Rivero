import React from "react";
import StatsCard from "./stats-card";
import RowSkeleton from "@components/layout/loading-skeleton/row-skeleton/row-skeleton";

export default function StatsCardSkeleton() {
  return (
    <StatsCard>
      <RowSkeleton />
    </StatsCard>
  );
}
