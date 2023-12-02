import React from "react";
import LargeSkeleton from "../large-skeleton/large-skeleton";
import RowSkeleton from "../row-skeleton/row-skeleton";

export default function TableSkeleton() {
  return (
    <div role="status" className="card shadow animate-pule p-4">
      <LargeSkeleton />
      <div className="flex flex-col gap-3">
        <RowSkeleton />
        <RowSkeleton />
        <RowSkeleton />
        <RowSkeleton />
      </div>
    </div>
  );
}
