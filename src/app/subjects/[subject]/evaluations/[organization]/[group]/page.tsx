import Button from "@components/Button";
import NavigationCard from "@components/cards/navigationCard/NavigationCard";
import { faFileArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import SearchModal from "src/app/components/modal/search-modal";
// import Form from "../../../components/form";
import { auth } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";
import api from "src/app/utils/api";
import { Group, Types } from "@prisma/client";
import Card from "@components/Card";
import ItemsBox from "src/app/components/items-box/items-box";
// import { NoteWithFile } from "../../../../../models/note";
import { ChartComponent } from "src/app/components/charts/line/linechart";
import Options from "src/app/components/options/options";
import OpenCreateModal from "src/app/components/admin/open-create-modal/open-create-modal";
import DeleteBtn from "src/app/components/admin/delete-btn/delete-btn";
import GroupStats from "./components/group-stats";
import GroupsList from "./components/groups-list";
import { Suspense } from "react";
import LargeSkeleton from "src/app/components/loading-skeleton/large-skeleton/large-skeleton";
import { NoteWithFile } from "src/app/subjects/models/note";
import CreateAlert from "src/app/components/admin/create-alert/create-alert";
// import Options from "@components/Options";

export default async function EvaluationsPage({
  params: { subject, group, organization },
  searchParams,
}: {
  params: { subject: string; group: string; organization: string };
  searchParams: { [key: string]: string };
}) {
  const { data: notes } = (await api(
    `notes?subject=${subject}&type=${Types.EVALUATION}`
  )) as { data: NoteWithFile[] };

  // const { data: groups } = (await api(`groups/${organization}`, {
  //   // headers: { Authorization: `Bearer ${token}` },
  // })) as { data: Group[] };
  // console.log(groups);

  // const { data: scores } = (await api(`scores`, {
  //   headers: { Authorization: `Bearer ${token}` },
  // })) as {
  //   data: {
  //     [x: string]: {
  //       value: number;
  //       time: string;
  //     }[];
  //   };
  // };

  const canDelete = searchParams?.mode === "delete";
  // console.log(sco);

  // const series =
  //   group === "all"
  //     ? Object.values(scores).map((data) => ({ data }))
  //     : [{ data: scores[Number(group)] }];
  // const groupsData = groups.map(({ name, id }) => ({ name, id }));

  return (
    <>
      <div className="flex mt- justify-between items-center">
        <h2 className="text-xl font-semibold py-2">Evaluaciones</h2>
        <CreateAlert
            endpoint="notes"
            values={{ subjectId: subject, type: Types.EVALUATION }}
            key={"create-topic-alert"}
          />
        {/* <div className="flex gap-3">
          <OpenCreateModal />
          {!canDelete ? (
            <Button href="?mode=delete" color="red">
              Eliminar
            </Button>
          ) : (
            <Button href="?" color="white">
              Dejar de eliminar
            </Button>
          )}
        </div> */}
      </div>
      <ItemsBox>
        {notes.map(({ File: { name, externalId }, id }) => (
          <NavigationCard
            key={name}
            href={!canDelete ? `${group}/${externalId}` : ""}
          >
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
          <GroupStats group={group} />
        </Suspense>
      </Card>
      <Button>
        Generar reporte{" "}
        <FontAwesomeIcon className="w-4 h-4" icon={faFileArrowDown} />
      </Button>
      {/* <SearchModal
        searchParams={searchParams}
        title="Crear evaluación"
        id="create"
      > */}
      {/* <Form subject={subject} token={token} /> */}
      {/* </SearchModal> */}
      <Toaster />
    </>
  );
}
