import Card from "@components/cards/Card";
import StatsCard from "@components/cards/stats-card/stats-card";
import SectionTitleSkeleton from "@components/common/titles/section-title/section-title-skeleton";
import SmallTitle from "@components/common/titles/small-title";
import Section from "@components/containers/section";
import ChartSkeleton from "@components/layout/loading-skeleton/chart-skeleton";
import LargeSkeleton from "@components/layout/loading-skeleton/large-skeleton/large-skeleton";
import RowSkeleton from "@components/layout/loading-skeleton/row-skeleton/row-skeleton";
import SmallSkeleton from "@components/layout/loading-skeleton/small-skeleton";
import React from "react";

export default function OrganizationLoading() {
  return (
    <>
      <Section>
        <SectionTitleSkeleton />
      </Section>
      <Section>
        <SmallTitle>Grupos</SmallTitle>
        <LargeSkeleton />
        <div className="flex w-full flex-col sm:flex-row h-48 gap-md">
          <Card>
            <div className="flex flex-col min-w-[200px] h-full">
              <SmallTitle>Evaluaciones revisadas</SmallTitle>
              <ChartSkeleton />
            </div>
          </Card>
          <div className="flex flex-col gap-md h-full w-full md:max-w-[50%]">
            <Card>
              <RowSkeleton />
            </Card>
            <Card className="flex flex-col h-full">
              <RowSkeleton />
            </Card>
          </div>
        </div>
      </Section>
    </>
  );
}
