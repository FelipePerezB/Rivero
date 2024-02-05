import CardSkeleton from "@components/cards/card-skeleton";
import SectionTitleSkeleton from "@components/common/titles/section-title/section-title-skeleton";
import Section from "@components/containers/section";
import LargeSkeleton from "@components/layout/loading-skeleton/large-skeleton/large-skeleton";
import React from "react";

const LargeSkeletonGroup = () => {
  return <div className="flex gap-sm flex-col">
    <LargeSkeleton />
    <LargeSkeleton />
    <LargeSkeleton />
    <LargeSkeleton />
    <LargeSkeleton />
    <LargeSkeleton />
    <LargeSkeleton />
    <LargeSkeleton />
    <LargeSkeleton />
    <LargeSkeleton />
    <LargeSkeleton />
  </div>;
};

export default function LoadingScorePage() {
  return (
    <>
      <Section>
        <SectionTitleSkeleton />
      </Section>
      <Section>
        <div className="flex flex-col h-20">
          <LargeSkeleton />
          <LargeSkeleton />
        </div>
      </Section>
      <Section>
        <div className="flex flex-col items-center md:gap-x-md sm:items-start sm:grid sm:grid-rows-4 lg:grid-rows-3 xl:grid-rows-2 gap-y-lg gap-x-sm grid-flow-col-dense justify-around mt-4 md:mt-8 ">
          <LargeSkeletonGroup/>
          <LargeSkeletonGroup/>
          <LargeSkeletonGroup/>
          <LargeSkeletonGroup/>
          <LargeSkeletonGroup/>
          <LargeSkeletonGroup/>
          <LargeSkeletonGroup/>
        </div>
      </Section>
    </>
  );
}
