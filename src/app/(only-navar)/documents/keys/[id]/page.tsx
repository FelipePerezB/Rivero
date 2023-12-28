import { File } from "@prisma/client";
import React, { ReactNode } from "react";
import Document from "src/app/(main)/subjects/components/elements/files/document";
import Header from "src/app/(main)/subjects/components/elements/files/header";
import Section from "src/app/(main)/subjects/components/elements/files/section";
import Title from "src/app/(main)/subjects/components/elements/files/title";
import { Component } from "src/app/documents/edit/models/component";
import api from "src/utils/api";
import splitArray from "src/utils/splitArray";
// import EvaluationEditor from "../evaluation-editor";

const Cell = ({
  children,
  className = "",
  isHeader,
}: {
  children: ReactNode | string;
  className?: string;
  isHeader?: boolean;
}) => {
  className += " px-3 py-2 border border-blue-500/50 text-center";
  return isHeader ? (
    <th className={className}>{children}</th>
  ) : (
    <td className={className}>{children}</td>
  );
};

const Columns = ({
  data,
  header,
}: {
  data: [string, string][];
  header?: string;
}) => {
  const cols = splitArray(data, 10);
  return (
    <section className="flex justify-around">
      {cols?.map((col, i) => (
        <Table header={header} key={`keys-column-${i}`} cols={col} />
      ))}
    </section>
  );
};

const Table = ({
  cols,
  header = "Clave",
}: {
  cols: [string, string][];
  header?: string;
}) => (
  <table className="h-max mt-5" key={"keys-column"}>
    <tbody>
      <tr className="bg-blue-500/20 ">
        <Cell isHeader={true}>N°</Cell>
        <Cell isHeader={true}>{header}</Cell>
      </tr>
      {cols?.map(([key, value]) => (
        <tr key={`row-${key}-${value}`}>
          <Cell className="bg-blue-500/10">{key}</Cell>
          <Cell>{value}</Cell>
        </tr>
      ))}
    </tbody>
  </table>
);
type keysType = { expectedAns: string; number: number }[];

export default async function EvaluationKeysPage({
  params: { id },
  searchParams,
}: {
  params: { [key: string]: string };
  searchParams: { [key: string]: string };
}) {
  let file;
  const { data } = (await api("files/" + id, {}, [`files/${id}`])) as {
    data: File;
  };
  if (data?.content)
    file = {
      ...data,
      content: { ...JSON.parse(data.content) },
    };

  const evaluation = JSON.parse(data.content) as Component;
  const questions = evaluation?.options?.children;
  const keys = questions?.map(({ options: { expectedAns } }, i) => ({
    number: i + 1,
    expectedAns,
  })) as keysType;
  const equation = evaluation?.options?.function;
  const getScore = eval(`(x) => ${equation}`);
   
  return (
    <Document>
      <Section>
        <Header
          options={{
            subtitle: "Claves y escala de puntaje",
            title: `Evaluación N°${id.substring(0, 5)}`,
          }}
        />
        <Title options={{ size: "h2", text: "CLAVES" }} />
        <Columns
          data={keys?.map(({ number, expectedAns }) => [
            String(number),
            expectedAns,
          ])}
        />
      </Section>
      <Section>
        <Title
          options={{ size: "h2", text: "ESCALA DE TRANSFORMACIÓN DE PUNTAJE" }}
        />
        <Columns
          header="Puntaje"
          data={keys?.map(({ number, expectedAns }) => [
            String(number - 1),
            String(getScore(number)),
          ])}
        />
      </Section>
    </Document>
  );
}
