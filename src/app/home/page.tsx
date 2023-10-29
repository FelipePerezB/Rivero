import { SubjectWithTopic } from "@components/containers/subjectsCards/SubjectsCards";
import React from "react";
import api from "../utils/api";
import Card from "@components/Card";
import capFirst from "src/utils/capFirst";
import Tags from "@components/tags/Tags";
import Link from "next/link";
import DocsCards from "@components/containers/docsCards/docs-cards";
import ItemsBox from "../components/items-box/items-box";
import { Pie } from "react-chartjs-2";
import PieChart from "./components/pie-chart";

export default async function HomePage() {
  const { subjects } = (await api("subjects", {}, ["subjects"])) as {
    subjects: SubjectWithTopic[];
  };

  const data = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "My First Dataset",
        data: [300, 50, 100],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <>
      <h2 className="text-4xl font-semibold ">¡Hola, Felipe!</h2>
      <h2 className="text-2xl font-semibold ">Mis rutas</h2>
      <ItemsBox>
        {subjects.map(({ name, Topics, color, id }) => {
          const topicId = Topics?.at(0)?.id;
          const href = Topics?.length ? `/subjects/${id}/${topicId}` : "";
          return (
            <Link
              href={href}
              key={`card-${name}`}
              className="flex flex-col border rounded-md w-full h-44 p-0 overflow-hidden hover:scale-95 transition-all duration-150 cursor-pointer shadow-sm"
            >
              <div className="flex flex-col items-center justify-center w-full h-4/6 bg-blue-50/20 p-6">
                <span className="text-xl">
                  {(Math.random() * 100).toFixed(0)}%
                </span>
                <span className="text-xs text-gray-400">Completado</span>
              </div>
              <div className="w-full h-2/6 border-t p-2">
                <h4 className="text-sm font-semibold">{capFirst(name)}</h4>
                <Tags tags={Topics.map(({ name }) => name)} />
              </div>
            </Link>
          );
        })}
      </ItemsBox>
      {/* <Card className="p-0">
        <h3 className="p-2 text-lg font-semibold border-b">PAES</h3>
        {subjects.map(({ name, id, Topics, color }) => {
          const topicId = Topics?.at(0)?.id;
          const href = Topics?.length ? `/subjects/${id}/${topicId}` : "";
          return (
            <Link
              href={href}
              className=" flex gap-4 justify-between items-center p-2.5 py-3.5 hover:bg-slate-50 cursor-pointer"
              key={"subject-" + id}
            >
              <span className="flex flex-col h-8 items-center">
                <span>{capFirst(name)}</span>
                <div className="w-full h-0.5 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    style={{ background: color }}
                    className="w-9/12 h-full opacity-80 bg-blue-500 rounded-full"
                  ></div>
                </div>
              </span>
              <Tags tags={Topics.map(({ name }) => name)} />
            </Link>
          );
        })}
      </Card> */}
      <h2 className="text-2xl font-semibold mt-4">Documentos guardados</h2>
      <ItemsBox size="sm">
        <DocsCards />
      </ItemsBox>
    </>
  );
}
