import { auth } from "@clerk/nextjs";
import Button from "@components/Button";
import Card from "@components/Card";
import Table from "@components/table/Table";
import StandardInput from "@components/inputs/StandardInput/StandardInput";
import {
  faFileArrowDown,
  faFileExcel,
  faKey,
  faList,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { title } from "process";
import React, { Suspense } from "react";
import OptionsInput from "src/app/components/edit-wraper/components/inputs/options";
import SearchModal from "src/app/components/modal/search-modal";
import Options from "src/app/components/options/options";
import { NoteWithFile } from "src/app/documents/models/note";
import api from "src/app/utils/api";
import { Group } from "src/gql/graphql";
// import Form from "./[group]/components/form";
import { Toaster } from "react-hot-toast";
import { Score } from "@prisma/client";
// import GroupsList from "./[group]/components/groups-list";
import LargeSkeleton from "src/app/components/loading-skeleton/large-skeleton/large-skeleton";
import ScoresTable from "./components/scores-table/scores-table";
import GroupsList from "../components/groups-list";
import ScoresStats from "./components/scores-stats/scores-stats";

// Ver estadísticas (tabla)
// Agregar puntaje (tabla)
// Descargar ensayo
// Editar ensayo

const RowSkeleton = () => (
  <div className="flex items-center justify-between pt-4 bg-white">
    <div className="w-full flex items-center justify-around gap-3">
      <div>
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
        <div className="w-24 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
      </div>
      <div>
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
        <div className="w-24 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
      </div>
      <div>
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
        <div className="w-24 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
      </div>
    </div>
  </div>
);

export default async function EvaluationPage({
  searchParams,
  params: { evaluation, group, organization, subject },
}: {
  params: { [key: string]: string };
  searchParams: { [key: string]: string };
}) {
  // const { getToken } = auth();
  // const token = await getToken();

  const { data: note } = (await api("notes/" + evaluation, {
    // headers: { Authorization: `Bearer ${token}` },
  })) as { data: NoteWithFile[] };

  // const { data: groups } = (await api("groups/1", {
  //   headers: { Authorization: `Bearer ${token}` },
  // })) as { data: Group[] };

  // const { data: scores } = (await api(`scores/${evaluation}/${group}`, {
  //   headers: { Authorization: `Bearer ${token}` },
  // })) as { data: Score[] };

  const { File } = note[0] ?? {};
  // const group = groups.find(({ id }) => Number(id) === Number(groupId));
  // console.log(groups, group)

  // const tableData = group?.Users?.map(({ name, lastname, email, id }) => {
  //   const score = scores.find(({ userId }) => userId === Number(id))?.score;
  //   return [`${name} ${lastname}`, email, score ?? "---"];
  // });

  // const scoresNums = scores.map(({ score }) => score);
  // const { length } = scores;
  // const sortedScore = scoresNums.sort((a, b) => a - b);
  // const maxScore = sortedScore.at(1);
  // const minScore = sortedScore.at(-1);
  // const avg = Number(
  //   (scoresNums.reduce((a, b) => a + b, 0) / length).toFixed(2)
  // );
  // const n = length % 2 === 0 ? length : length + 1;
  // const quartile = (k: number) => {
  //   if (length <= 2) {
  //     return scoresNums.at(k <= 2 ? k - 1 : 1);
  //   }
  //   const index = (k * n) / 4;
  //   return index % 2 === 0
  //     ? scoresNums[index]
  //     : (scoresNums[Math.floor(index)] + scoresNums[Math.floor(index) + 1]) / 2;
  // };

  return (
    <>
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-xl">{File?.title}</h1>
        <div className="flex gap-2">
          <Button href={"/documents/download/" + evaluation}>
            Descargar
            <FontAwesomeIcon className="h-3 w-3" icon={faFileArrowDown} />
          </Button>
          <Button
            color="white"
            href={"/documents/download/check/" + evaluation}
          >
            <FontAwesomeIcon className="h-3 w-3" icon={faFileExcel} />
          </Button>
        </div>
      </div>
      <Suspense fallback={<LargeSkeleton />}>
        <GroupsList
          customPath={`/documents/${subject}/evaluations/${organization}/[key]/${evaluation}`}
          group={group}
          organization={organization}
        />
      </Suspense>
      {/* <Options
        option={groupId}
        options={groups?.map(({ name, id }) => ({ title: name, key: id }))}
      /> */}
      <Suspense
        fallback={
          <div role="status" className="card shadow animate-pule p-4">
            <LargeSkeleton />
            <div className="flex flex-col gap-3">
              <RowSkeleton />
              <RowSkeleton />
              <RowSkeleton />
              <RowSkeleton />
            </div>
          </div>
        }
      >
        <ScoresTable
          organization={organization}
          evaluation={evaluation}
          group={group}
        />
      </Suspense>

      {/* <section className="grid md:grid-cols-2 gap-4 my-2"> */}
        <Suspense
          fallback={
            <section className="grid md:grid-cols-2 gap-4 p-6">
              <RowSkeleton />
              <RowSkeleton />
            </section>
          }
        >
          <ScoresStats evaluation={evaluation} group={group} />
        </Suspense>
        {/* <Card className="flex justify-around ">
          <CardItem title="Puntaje menor" value={String(minScore)} />
          <CardItem title="Promedio" value={String(avg)} />
          <CardItem title="Puntaje mayor" value={String(maxScore)} />
        </Card>
        <Card className="flex justify-around ">
          <CardItem title="Q1" value={String(quartile(1))} />
          <CardItem title="Q2" value={String(quartile(2))} />
          <CardItem title="Q3" value={String(quartile(3))} />
        </Card> */}
      {/* </section> */}
      <Button color="black" size="lg">
        Generar reporte
        <FontAwesomeIcon className="max-h-4 w-4" icon={faFileArrowDown} />
      </Button>
      <SearchModal
        id="new-score"
        title="Nuevo puntaje"
        searchParams={searchParams}
      >
        {/* {!!group?.Users?.length && token && (
          <Form
            fileId={evaluation}
            token={token}
            users={group?.Users?.map(({ email, id }) => ({ email, id }))}
          />
        )} */}
      </SearchModal>
      <Toaster />
    </>
  );
}
