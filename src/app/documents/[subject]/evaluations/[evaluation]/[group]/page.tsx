import { auth } from "@clerk/nextjs";
import Button from "@components/Button";
import Card from "@components/Card";
import Table from "@components/Table";
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
import React from "react";
import OptionsInput from "src/app/components/edit-wraper/components/inputs/options";
import SearchModal from "src/app/components/modal/search-modal";
import Options from "src/app/components/options/options";
import { NoteWithFile } from "src/app/documents/models/note";
import api from "src/app/utils/api";
import { Group } from "src/gql/graphql";
import Form from "./components/form";
import { Toaster } from "react-hot-toast";
import { Score } from "@prisma/client";

// Ver estadísticas (tabla)
// Agregar puntaje (tabla)
// Descargar ensayo
// Editar ensayo

const initialData = [
  { time: "2018-12-22", value: 32.51 },
  { time: "2018-12-23", value: 31.11 },
  { time: "2018-12-24", value: 27.02 },
  { time: "2018-12-25", value: 27.32 },
  { time: "2018-12-26", value: 25.17 },
  { time: "2018-12-27", value: 28.89 },
  { time: "2018-12-28", value: 25.46 },
  { time: "2018-12-29", value: 23.92 },
  { time: "2018-12-30", value: 22.68 },
  { time: "2018-12-31", value: 22.67 },
];

export default async function EvaluationPage({
  searchParams,
  params: { evaluation, group: groupId },
}: {
  params: { [key: string]: string };
  searchParams: { [key: string]: string };
}) {
  const { getToken } = auth();
  const token = await getToken();

  const { data: note } = (await api("notes/" + evaluation, {
    headers: { Authorization: `Bearer ${token}` },
  })) as { data: NoteWithFile[] };

  const { data: groups } = (await api("groups", {
    headers: { Authorization: `Bearer ${token}` },
  })) as { data: Group[] };

  console.log(evaluation);

  const { data: scores } = (await api(`scores/${evaluation}/${groupId}`, {
    headers: { Authorization: `Bearer ${token}` },
  })) as { data: Score[] };
  console.log(scores);

  const { File } = note[0];
  const group = groups.find(({ id }) => Number(id) === Number(groupId));

  const tableData = group?.Users?.map(({ name, lastname, email, id }) => {
    const score = scores.find(({ userId }) => userId === Number(id))?.score;
    return [`${name} ${lastname}`, email, score ?? "---"];
  });

  const scoresNums = scores.map(({ score }) => score);
  const { length } = scores;
  const sortedScore = scoresNums.sort((a, b) => a - b);
  const maxScore = sortedScore.at(1);
  const minScore = sortedScore.at(-1);
  const avg = scoresNums.reduce((a, b) => a + b) / length;
  const n = length % 2 === 0 ? length : length + 1;
  console.log(length);
  const quartile = (k: number) => {
    if (length <= 2) {
      return scoresNums.at(k <= 2 ? k - 1 : 1);
    }
    const index = (k * n) / 4;
    return index % 2 === 0
      ? scoresNums[index]
      : (scoresNums[Math.floor(index)] + scoresNums[Math.floor(index) + 1]) / 2;
  };

  return (
    <>
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-xl">{File?.title}</h1>
        <div className="flex gap-2">
          <Button href={"/documents/download/" + evaluation}>
            Descargar
            <FontAwesomeIcon className="h-3 w-3" icon={faFileArrowDown} />
          </Button>
          <Button color="white" href={"/documents/download/check/" + evaluation}>
            <FontAwesomeIcon className="h-3 w-3" icon={faFileExcel} />
          </Button>
        </div>
      </div>
      <Options
        option={group?.name}
        options={groups?.map(({ name, id }) => ({ title: name, key: id }))}
      />
      <Table
        head={{
          title: group?.name,
          keys: [
            { name: "Nombre", key: "name" },
            { name: "Correo", key: "email" },
            { name: "Puntaje", key: "score" },
          ],
          icons: [
            <Link
              href={"?modal=new-score"}
              className="flex items-center gap-1.5 hover:bg-gray-100 rounded-sm py-1 px-1.5 cursor-pointer transition-all duration-150"
              key="add-score"
            >
              Nuevo
              <FontAwesomeIcon className="w-3 h-3" icon={faPlus} />
            </Link>,
          ],
        }}
        data={tableData}
      />
      <section className="grid md:grid-cols-2 gap-4 my-2">
        <Card className="flex justify-around ">
          <div className="flex flex-col items-center">
            <h3 className="font-bold">Puntaje menor</h3>
            <span>{minScore}</span>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="font-bold">Promedio</h3>
            <span>{avg}</span>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="font-bold">Puntaje mayor</h3>
            <span>{maxScore}</span>
          </div>
        </Card>
        <Card className="flex justify-around ">
          <div className="flex flex-col items-center">
            <h3 className="font-bold">Q1</h3>
            <span>{quartile(1)}</span>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="font-bold">Q2</h3>
            <span>{quartile(2)}</span>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="font-bold">Q3</h3>
            <span>{quartile(3)}</span>
          </div>
        </Card>
      </section>
      <Button color="black" size="lg">
        Generar reporte
        <FontAwesomeIcon className="max-h-4 w-4" icon={faFileArrowDown} />
      </Button>
      <SearchModal
        id="new-score"
        title="Nuevo puntaje"
        searchParams={searchParams}
      >
        {!!group?.Users?.length && token && (
          <Form
            fileId={evaluation}
            token={token}
            users={group?.Users?.map(({ email, id }) => ({ email, id }))}
          />
        )}
      </SearchModal>
      <Toaster />
    </>
  );
}
