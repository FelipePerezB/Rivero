import Section from "@components/containers/section";
import LargeSkeleton from "@components/layout/loading-skeleton/large-skeleton/large-skeleton";
import React from "react";
import HomeCardSkeleton from "./components/home-card-skeleton";
import HomeStatsSkeleton from "./components/home-stats-skeleton";
import Card from "@components/cards/Card";
import ItemsBox from "@components/containers/items-box/items-box";

export default function LoadingHome() {
  return (
    <>
      <Section>
        <div className="h-14">
          <LargeSkeleton />
        </div>
        <article className="flex flex-col sm:flex-row gap-sm sm:gap-md">
          <section className="flex sm:flex-col flex-row gap-sm sm:gap-md h-full w-full sm:w-max">
            <HomeCardSkeleton />
            <HomeCardSkeleton />
          </section>
          <section className="w-full">
            <Card className="flex h-[184px]">
              <HomeStatsSkeleton />
            </Card>
          </section>
        </article>
      </Section>
      <Section>
        <div className="h-14">
          <LargeSkeleton />
        </div>
        <ItemsBox>
          <Card>
            <LargeSkeleton/>
          </Card>
          <Card>
            <LargeSkeleton/>
          </Card>
          <Card>
            <LargeSkeleton/>
          </Card>
          <Card>
            <LargeSkeleton/>
          </Card>
        </ItemsBox>
      </Section>
    </>
  );
}
