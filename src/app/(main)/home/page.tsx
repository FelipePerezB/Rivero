import React, { Suspense } from "react";
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
import SmallTitle from "@components/common/titles/small-title";
import BarsChart from "@components/dashboard/charts/bars";
import SectionTitle from "@components/common/titles/section-title";
import SubjectsCards from "./components/subjects-card";
import LessonProgress from "./components/lessons-progress";

export const Item = ({
  subtitle,
  title,
}: {
  title?: string | number;
  subtitle: string;
}) => (
  <div className="flex flex-col justify-center w-20">
    <span className="text-xl font-medium text-center">{title}</span>
    <span className="text-xs font-extralight text-center">{subtitle}</span>
  </div>
);

export default async function HomePage() {
  const { subjects } = (await api("subjects", {}, ["subjects"])) as {
    subjects: SubjectWithTopic[];
  };

  return (
    <>
      <Section>
        <Suspense fallback={<LargeSkeleton />}>
          <HomeTitle />
        </Suspense>
        <article className="flex flex-col sm:flex-row gap-sm sm:gap-md">
          <section className="flex sm:flex-col flex-row gap-sm sm:gap-md h-full w-full sm:w-max">
            <UserCard />
            <OrganizationCard />
          </section>
          <section className="w-full">
            <LessonProgress subjects={subjects} />
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
