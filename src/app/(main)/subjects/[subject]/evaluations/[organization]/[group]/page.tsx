import Button from "@components/common/buttons/button/button";
import { faFileArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Toaster } from "react-hot-toast";
import api from "src/utils/api";
import { Types } from "@prisma/client";
import GroupStats from "./components/group-stats";
import GroupsList from "./components/groups-list";
import { Suspense } from "react";
import LargeSkeleton from "@components/layout/loading-skeleton/large-skeleton/large-skeleton";
import { LessonWithFile } from "src/app/(main)/subjects/models/lesson";
import ItemsBox from "@components/containers/items-box/items-box";
import NavigationCard from "@components/cards/NavigationCard";
import Card from "@components/cards/Card";

export default async function EvaluationsPage({
  params: { subject, group, organization },
  searchParams,
}: {
  params: { subject: string; group: string; organization: string };
  searchParams: { [key: string]: string };
}) {
  const { data: notes } = (await api(
    `notes?subject=${subject}&type=${Types.EVALUATION}`,
    {},
    [`evaluations/${subject}`]
  )) as { data: LessonWithFile[] };

  return (
    <>
      {!!notes.length && (
        <h2 className="text-xl font-semibold py-2">Evaluaciones</h2>
      )}
      <ItemsBox>
        {notes.map(({ File: { name, externalId }, id }) => (
          <NavigationCard key={name} href={`${group}/${externalId}`}>
            {name}
          </NavigationCard>
        ))}
      </ItemsBox>
      <h2 className="text-xl font-semibold py-2">Estadísticas</h2>
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
          <GroupStats subject={subject} organization={organization} group={group} />
        </Suspense>
      </Card>
      <Button>
        Generar reporte{" "}
        <FontAwesomeIcon className="w-4 h-4" icon={faFileArrowDown} />
      </Button>
      <Toaster />
    </>
  );
}
