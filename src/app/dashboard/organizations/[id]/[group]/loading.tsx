import React from "react";
import LargeSkeleton from "src/app/components/loading-skeleton/large-skeleton/large-skeleton";
import TableSkeleton from "src/app/components/loading-skeleton/table-skeleton/table-skeleton";

export default function Loading() {
  return (
    <>
      <LargeSkeleton />
      <TableSkeleton />
    </>
  );
}
