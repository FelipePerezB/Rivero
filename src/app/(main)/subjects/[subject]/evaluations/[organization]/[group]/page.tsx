import Button from "@components/common/buttons/button/button";
import { faFileArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "src/utils/api";
import { Privacity } from "@prisma/client";
import GroupsList from "./components/groups-list";
import { Suspense } from "react";
import LargeSkeleton from "@components/layout/loading-skeleton/large-skeleton/large-skeleton";
import { LessonWithFile } from "src/app/(main)/subjects/models/lesson";
import ItemsBox from "@components/containers/items-box/items-box";
import NavigationCard from "@components/cards/NavigationCard";
import Card from "@components/cards/Card";
import Section from "@components/containers/section";
import SectionTitle from "@components/common/titles/section-title/section-title";
import SmallTitle from "@components/common/titles/small-title";
import ChartSkeleton from "@components/layout/loading-skeleton/chart-skeleton";
import OrganizationProtect from "@components/admin/protect/organization-protect";
import StatsCardsGroup from "@components/cards/stats-card/stats-cards-group";
import StatsCardSkeleton from "@components/cards/stats-card/stats-card-skeleton";
import React from "react";
import CardSkeleton from "@components/cards/card-skeleton";
import ScoresStats from "./[evaluation]/components/scores-stats/scores-stats";
import ScoresChart from "./components/scores-chart";

export default async function EvaluationsPage({
  params: { subject, group, organization },
}: {
  params: { subject: string; group: string; organization: string };
  searchParams: { [key: string]: string };
}) {
  return (
    <OrganizationProtect organizationId={organization}>
      <Section>
        <SectionTitle
          title="Evaluaciones"
          subTitle="Evalua los conocimientos de la asignatura"
        />
        <ItemsBox size="lg">
          <Suspense
            fallback={
              <>
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
              </>
            }
          >
            <Evaluations {...{ group, subject }} />
          </Suspense>
        </ItemsBox>
      </Section>
      <Section>
        <div className="w-full flex justify-between items-center">
          <SmallTitle>Estadísticas</SmallTitle>
          <Button>
            Generar reporte
            <FontAwesomeIcon className="w-4 h-4" icon={faFileArrowDown} />
          </Button>
        </div>
        <div className="flex flex-col gap-md">
          <Card className="flex flex-col justify-between gap-md h-[400px]">
            <Suspense fallback={<LargeSkeleton />}>
              <GroupsList group={group} organization={organization} />
            </Suspense>
            <Suspense fallback={<ChartSkeleton />}>
              <ScoresChart {...{ group, organization, subject }} />
            </Suspense>
          </Card>
          <Suspense
            fallback={
              <StatsCardsGroup>
                <StatsCardSkeleton />
                <StatsCardSkeleton />
              </StatsCardsGroup>
            }
          >
            <ScoresStats
              subject={subject}
              organization={organization}
              group={group}
            />
          </Suspense>
        </div>
      </Section>
    </OrganizationProtect>
  );
}

async function Evaluations({
  subject,
  group,
}: {
  subject: string;
  group: string;
}) {
  const { data: evaluations } = (await api(
    `lessons/evaluations/${subject}`,
    {},
    [`lessons/${subject}`]
  )) as { data: LessonWithFile[] };

  const publicEvaluations = evaluations?.filter(
    ({ File: { privacity } }) => privacity === Privacity?.PUBLIC
  );
  return publicEvaluations.map(({ File: { name, externalId }, id }) => (
    <NavigationCard key={name} href={`${group}/${externalId}`}>
      {name}
    </NavigationCard>
  ));
}