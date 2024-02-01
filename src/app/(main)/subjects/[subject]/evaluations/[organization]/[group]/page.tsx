import Button from "@components/common/buttons/button/button";
import { faFileArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Toaster } from "react-hot-toast";
import api from "src/utils/api";
import { Privacity, Score, Types } from "@prisma/client";
import GroupStats from "./components/group-stats";
import GroupsList from "./components/groups-list";
import { ReactNode, Suspense } from "react";
import LargeSkeleton from "@components/layout/loading-skeleton/large-skeleton/large-skeleton";
import { LessonWithFile } from "src/app/(main)/subjects/models/lesson";
import ItemsBox from "@components/containers/items-box/items-box";
import NavigationCard from "@components/cards/NavigationCard";
import Card from "@components/cards/Card";
import Section from "@components/containers/section";
import SectionTitle from "@components/common/titles/section-title";
import SmallTitle from "@components/common/titles/small-title";
import getAvg from "src/utils/maths/getAvg";
import getQuartile from "src/utils/maths/getQuartile";
import ChartSkeleton from "@components/layout/loading-skeleton/chart-skeleton";
import Item from "@components/dashboard/item";
import { ScoresWithGroup } from "src/utils/format/formatScores";
import OrganizationProtect from "@components/admin/protect/organization-protect";
import { auth } from "@clerk/nextjs";
import Loading from "@components/common/loading-spinner/loadding-spinner";
import RowSkeleton from "@components/layout/loading-skeleton/row-skeleton/row-skeleton";

export default async function EvaluationsPage({
  params: { subject, group, organization },
  searchParams,
}: {
  params: { subject: string; group: string; organization: string };
  searchParams: { [key: string]: string };
}) {
  const { data: evaluations } = (await api(
    `lessons/evaluations/${subject}`,
    {},
    [`lessons/${subject}`]
  )) as { data: LessonWithFile[] };

  const publicEvaluations = evaluations?.filter(
    ({ File: { privacity } }) => privacity === Privacity?.PUBLIC
  );

  // const { data: scores } = (await api(
  //   `scores/subject/${subject}/${organization}/${group !== "all" ? group : ""}`,
  //   {
  //     cache: "no-store",
  //   },
  //   [`scores/${organization}`]
  // )) as {
  //   data: ScoresWithGroup[];
  // };
  // const flatScores = scores.map(({ score }) => score);
  // const sortedScores = flatScores.sort((a, b) => a - b);

  return (
    <OrganizationProtect organizationId={organization}>
      <Section>
        <SectionTitle
          title="Evaluaciones"
          subTitle="Evalua los conocimientos de la asignatura"
        />
        <ItemsBox size="xs">
          {publicEvaluations.map(({ File: { name, externalId }, id }) => (
            <NavigationCard key={name} href={`${group}/${externalId}`}>
              {name}
            </NavigationCard>
          ))}
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
          <Suspense
            fallback={
              <>
                <Card className="flex flex-col justify-between gap-2 h-[390px]">
                  <LargeSkeleton />
                  <ChartSkeleton />
                </Card>
                <div className="flex flex-col sm:flex-row  w-full gap-md">
                  <Card className="flex gap-sm justify-between">
                    <RowSkeleton />
                  </Card>
                  <Card className="flex gap-sm justify-between">
                    <RowSkeleton />
                  </Card>
                </div>
              </>
            }
          >
            <ScoresStats
              group={group}
              organization={organization}
              subject={subject}
            />
          </Suspense>
          {/* <Card className="flex flex-col justify-between gap-2 h-[390px]">
            <Suspense fallback={<LargeSkeleton />}>
              <GroupsList group={group} organization={organization} />
            </Suspense>
            <Suspense fallback={<ChartSkeleton />}>
              <GroupStats
                scores={scores}
                subject={subject}
                organization={organization}
                group={group}
              />
            </Suspense>
          </Card>
          {!!scores?.length && (
            <div className="flex flex-col sm:flex-row  w-full gap-md">
              <Card className="flex gap-sm justify-between">
                <Item title={sortedScores.at(-1)} subtitle="Puntaje mayor" />
                <Item title={getAvg(flatScores)} subtitle="Promedio" />
                <Item title={sortedScores.at(0)} subtitle="Puntaje menor" />
              </Card>
              <Card className="flex gap-sm justify-between">
                <Item title={getQuartile(flatScores, 1)} subtitle="Cuartil 1" />
                <Item title={getQuartile(flatScores, 2)} subtitle="Cuartil 2" />
                <Item title={getQuartile(flatScores, 3)} subtitle="Cuartil 3" />
              </Card>
            </div>
          )} */}
        </div>
      </Section>
    </OrganizationProtect>
  );
}

const ScoresStats = async ({
  group,
  organization,
  subject,
}: {
  subject: string;
  organization: string;
  group: string;
}) => {
  const { getToken } = auth();
  const token = await getToken();
  const { data: scores } = (await api(
    `scores/subject/${subject}/${organization}/${group !== "all" ? group : ""}`,
    {
      cache: "no-store",
      headers: { Authorization: `Bearer ${token}` },
    },
    [`scores/${organization}`]
  )) as {
    data: ScoresWithGroup[];
  };
  const flatScores = scores.map(({ score }) => score);
  const sortedScores = flatScores.sort((a, b) => a - b);
  return (
    <>
      <Card className="flex flex-col justify-between gap-2 h-[390px]">
        <Suspense fallback={<LargeSkeleton />}>
          <GroupsList group={group} organization={organization} />
        </Suspense>
        <Suspense fallback={<ChartSkeleton />}>
          <GroupStats
            scores={scores}
            subject={subject}
            organization={organization}
            group={group}
          />
        </Suspense>
      </Card>
      {!!scores?.length && (
        <div className="flex flex-col sm:flex-row  w-full gap-md">
          <Card className="flex gap-sm justify-between">
            <Item title={sortedScores.at(-1)} subtitle="Puntaje mayor" />
            <Item title={getAvg(flatScores)} subtitle="Promedio" />
            <Item title={sortedScores.at(0)} subtitle="Puntaje menor" />
          </Card>
          <Card className="flex gap-sm justify-between">
            <Item title={getQuartile(flatScores, 1)} subtitle="Cuartil 1" />
            <Item title={getQuartile(flatScores, 2)} subtitle="Cuartil 2" />
            <Item title={getQuartile(flatScores, 3)} subtitle="Cuartil 3" />
          </Card>
        </div>
      )}
    </>
  );
};
