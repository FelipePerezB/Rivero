import React, { ReactNode, Suspense } from "react";
import api from "../../../utils/api";
import Tags from "@components/common/tags/Tags";
import ItemsBox from "../../../components/containers/items-box/items-box";
import HomeTitle from "./components/home-title";
import LargeSkeleton from "../../../components/layout/loading-skeleton/large-skeleton/large-skeleton";
import { SubjectWithTopic } from "../subjects/models/subject";
import DocsCards from "@components/containers/docs-cards/docs-cards";
import CardWithItem from "@components/cards/card-with-item";
import getProgress from "src/services/cache/getProgress";
import Section from "../../../components/containers/section";
import Card from "@components/cards/Card";
import UserCard from "./components/user-card";
import OrganizationCard from "./components/organization-card";
import SectionTitle from "@components/common/titles/section-title";
import SubjectsCards from "./components/subjects-card";
import LessonProgress from "./components/lessons-progress";
import TableSkeleton from "@components/layout/loading-skeleton/table-skeleton/table-skeleton";
import ChartSkeleton from "@components/layout/loading-skeleton/chart-skeleton";
import SmallTitle from "@components/common/titles/small-title";
import XsSkeleton from "@components/layout/loading-skeleton/xs-skeleton";
import Item from "@components/dashboard/item";

export default async function HomePage() {
  const { subjects } = (await api("subjects", {}, ["subjects"])) as {
    subjects: SubjectWithTopic[];
  };

  return (
    <>
      <Section>
        <HomeTitle />
        <article className="flex flex-col sm:flex-row gap-sm sm:gap-md">
          <section className="flex sm:flex-col flex-row gap-sm sm:gap-md h-full w-full sm:w-max">
            <UserCard />

            <OrganizationCard />
          </section>
          <section className="w-full">
            <Card className="flex h-full">
              <Suspense
                fallback={
                  <>
                  <div className="flex flex-col h-40 md:w-1/2 w-full">
                  <SmallTitle>Resumen semanal</SmallTitle>
                  <ChartSkeleton />
                </div>
                <div className="hidden md:flex flex-col gap-sm justify-center mx-auto" >
                  <div className="w-full flex gap-2 justify-between items-start">
                    <Item subtitle="Lecciones hoy" title={<XsSkeleton/>}/>
                    <Item subtitle="Lecciones esta semana" title={<XsSkeleton/>}/>
                    <Item subtitle="Lecciones este mes" title={<XsSkeleton/>}/>
                  </div>
                  <div className="w-full flex gap-2 justify-between">
                  <Item subtitle="Prácticas" title={<XsSkeleton/>}/>
                    <Item subtitle="Puntajes" title={<XsSkeleton/>}/>
                    <Item subtitle="Último puntaje" title={<XsSkeleton/>}/>
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
        <article className="flex gap-md overflow-x-auto">
          <SubjectsCards subjects={subjects} />
        </article>
      </Section>
    </>
  );
}
