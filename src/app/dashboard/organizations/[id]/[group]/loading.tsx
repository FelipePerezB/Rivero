import React from "react";
import LargeSkeleton from "@components/layout/loading-skeleton/large-skeleton/large-skeleton";
import TableSkeleton from "@components/layout/loading-skeleton/table-skeleton/table-skeleton";

export default function Loading() {
  return (
    <>
      <LargeSkeleton />
      <TableSkeleton />
    </>
  );
}
