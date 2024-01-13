import Button from "@components/common/buttons/button/button";
import { faFileArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Toaster } from "react-hot-toast";
import api from "src/utils/api";
import { Privacity, Score, Types } from "@prisma/client";
import GroupStats from "./components/group-stats";
import GroupsList from "./components/groups-list";
import { Suspense } from "react";
import LargeSkeleton from "@components/layout/loading-skeleton/large-skeleton/large-skeleton";
import { LessonWithFile } from "src/app/(main)/subjects/models/lesson";
import ItemsBox from "@components/containers/items-box/items-box";
import NavigationCard from "@components/cards/NavigationCard";
import Card from "@components/cards/Card";
import Section from "@components/containers/section";
import SectionTitle from "@components/common/titles/section-title";
import SmallTitle from "@components/common/titles/small-title";
import { Item } from "src/app/(main)/home/page";
import getAvg from "src/utils/maths/getAvg";
import getQuartile from "src/utils/maths/getQuartile";

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

  const { data: scores } = (await api(
    `scores/${organization}?group=${
      group !== "all" ? group : ""
    }&subject=${subject}`,
    {
      cache: "no-store",
    },
    [`scores/organizations/${organization}`]
  )) as {
    data: {
      [x: string]: {
        value: number;
        time: string;
      }[];
    };
  };

  const flatScores = Object.values(scores).flat(2).map(({value})=>value);
  const sortedScores = flatScores.sort((a,b)=>a-b)
  console.log(flatScores)

  return (
    <>
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
          <Card className="p-6 p-b-3">
            <Suspense fallback={<LargeSkeleton />}>
              <GroupsList group={group} organization={organization} />
            </Suspense>
            <Suspense
              fallback={
                <div className="flex items-baseline mt-4 space-x-6 animate-pulse">
                  <div className="w-full bg-gray-200 rounded-t-lg h-56 dark:bg-gray-700"></div>
                  <div className="w-full h-48 bg-gray-200 rounded-t-lg dark:bg-gray-700"></div>
                  <div className="w-full bg-gray-200 rounded-t-lg h-64 dark:bg-gray-700"></div>
                  <div className="w-full h-60 bg-gray-200 rounded-t-lg dark:bg-gray-700"></div>
                  <div className="w-full bg-gray-200 rounded-t-lg h-64 dark:bg-gray-700"></div>
                  <div className="w-full bg-gray-200 rounded-t-lg h-72 dark:bg-gray-700"></div>
                  <div className="w-full bg-gray-200 rounded-t-lg h-56 dark:bg-gray-700"></div>
                </div>
              }
            >
              <GroupStats
                scores={scores}
                subject={subject}
                organization={organization}
                group={group}
              />
            </Suspense>
          </Card>
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
        </div>
      </Section>
    </>
  );
}
