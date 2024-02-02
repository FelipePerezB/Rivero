import React, { Suspense } from "react";
import api from "../../../utils/api";
import HomeTitle from "./components/home-title";
import { SubjectWithTopic } from "../subjects/models/subject";
import Section from "../../../components/containers/section";
import Card from "@components/cards/Card";
import UserCard from "./components/user-card";
import OrganizationCard from "./components/organization/organization-card";
import SectionTitle from "@components/common/titles/section-title";
import SubjectsCards from "./components/subjects-card";
import LessonProgress from "./components/lessons-progress";
import ChartSkeleton from "@components/layout/loading-skeleton/chart-skeleton";
import SmallTitle from "@components/common/titles/small-title";
import XsSkeleton from "@components/layout/loading-skeleton/xs-skeleton";
import Item from "@components/dashboard/item";
import SearchModal from "@components/modal/search-modal";
import OrganizationModal from "./components/organization/organization-modal";
import ItemsBox from "@components/containers/items-box/items-box";
import LargeSkeleton from "@components/layout/loading-skeleton/large-skeleton/large-skeleton";

export default async function HomePage({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const { subjects } = (await api("subjects", {}, ["subjects"])) as {
    subjects: SubjectWithTopic[];
  };

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
                  <Card className="sm:w-52 h-20">
                    <LargeSkeleton />
                  </Card>
                  <Card className="sm:w-52 h-20">
                    <LargeSkeleton />
                  </Card>
                </>
              }
            >
              <UserCard />
              <OrganizationCard />
            </Suspense>
          </section>
          <section className="w-full">
            <Card className="flex h-[184px]">
              <Suspense
                fallback={
                  <>
                    <div className="flex flex-col md:w-1/2 w-full">
                      <SmallTitle>Resumen semanal</SmallTitle>
                      <ChartSkeleton />
                    </div>
                    <div className="hidden md:flex flex-col gap-sm justify-center mx-auto">
                      <div className="w-full flex gap-2 justify-between items-start">
                        <Item subtitle="Lecciones hoy" title={<XsSkeleton />} />
                        <Item
                          subtitle="Lecciones esta semana"
                          title={<XsSkeleton />}
                        />
                        <Item
                          subtitle="Lecciones este mes"
                          title={<XsSkeleton />}
                        />
                      </div>
                      <div className="w-full flex gap-2 justify-between">
                        <Item subtitle="Prácticas" title={<XsSkeleton />} />
                        <Item subtitle="Puntajes" title={<XsSkeleton />} />
                        <Item
                          subtitle="Último puntaje"
                          title={<XsSkeleton />}
                        />
                      </div>
                    </div>
                  </>
                }
              >
                <LessonProgress subjects={subjects} />
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
          <SubjectsCards subjects={subjects} />
        </ItemsBox>
      </Section>
    </>
  );
}
