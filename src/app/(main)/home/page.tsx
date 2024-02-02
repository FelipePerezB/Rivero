import React, { Suspense } from "react";
import HomeTitle from "./components/home-title";
import Section from "../../../components/containers/section";
import Card from "@components/cards/Card";
import UserCard from "./components/user-card";
import OrganizationCard from "./components/organization/organization-card";
import SectionTitle from "@components/common/titles/section-title/section-title";
import SubjectsCards from "./components/subjects-card";
import LessonProgress from "./components/lessons-progress";
import SearchModal from "@components/modal/search-modal";
import OrganizationModal from "./components/organization/organization-modal";
import ItemsBox from "@components/containers/items-box/items-box";
import HomeStatsSkeleton from "./components/home-stats-skeleton";
import HomeCardSkeleton from "./components/home-card-skeleton";
import LargeSkeleton from "@components/layout/loading-skeleton/large-skeleton/large-skeleton";

export default async function HomePage({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  return (
    <>
      <Suspense>
        <SearchModal
          searchParams={searchParams}
          id="organization"
          title="Organización"
        >
          <OrganizationModal />
        </SearchModal>
      </Suspense>
      <Section>
        <Suspense
          fallback={
            <div className="h-14">
              <LargeSkeleton />
            </div>
          }
        >
          <HomeTitle />
        </Suspense>
        <article className="flex flex-col sm:flex-row gap-sm sm:gap-md">
          <section className="flex sm:flex-col flex-row gap-sm sm:gap-md h-full w-full sm:w-max">
            <Suspense
              fallback={
                <>
                  <HomeCardSkeleton />
                  <HomeCardSkeleton />
                </>
              }
            >
              <UserCard />
              <OrganizationCard />
            </Suspense>
          </section>
          <section className="w-full">
            <Card className="flex justify-between h-[184px]">
              <Suspense fallback={<HomeStatsSkeleton />}>
                <LessonProgress />
              </Suspense>
            </Card>
          </section>
        </article>
      </Section>

      <Section>
        <SectionTitle
          title={"Tus Rutas"}
          subTitle="Refuerza y expande tus conocimientos"
        />
        <ItemsBox>
          <Suspense
            fallback={
              <>
                <Card>
                  <LargeSkeleton />
                </Card>
                <Card>
                  <LargeSkeleton />
                </Card>
                <Card>
                  <LargeSkeleton />
                </Card>
                <Card>
                  <LargeSkeleton />
                </Card>
              </>
            }
          >
            <SubjectsCards />
          </Suspense>
        </ItemsBox>
      </Section>
    </>
  );
}
