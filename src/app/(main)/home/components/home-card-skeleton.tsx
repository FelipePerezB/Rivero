import Card from "@components/cards/Card";
import LargeSkeleton from "@components/layout/loading-skeleton/large-skeleton/large-skeleton";
import React from "react";

export default function HomeCardSkeleton() {
  return (
    <Card className="sm:w-52 h-20">
      <LargeSkeleton />
    </Card>
  );
}
