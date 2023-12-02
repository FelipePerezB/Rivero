import React, { Suspense } from "react";
import api from "../../utils/api";
import Tags from "@components/common/tags/Tags";
import ItemsBox from "../../components/containers/items-box/items-box";
import HomeTitle from "./components/home-title";
import LargeSkeleton from "../../components/layout/loading-skeleton/large-skeleton/large-skeleton";
import { SubjectWithTopic } from "../subjects/models/subject";
import DocsCards from "@components/containers/docs-cards/docs-cards";
import CardWithItem from "@components/cards/card-with-item";

export default async function HomePage() {
  const { subjects } = (await api("subjects", {}, ["subjects"])) as {
    subjects: SubjectWithTopic[];
  };

  return (
    <>
      <Suspense fallback={<LargeSkeleton />}>
        <HomeTitle />
      </Suspense>
      <h2 className="text-2xl font-semibold ">Mis rutas</h2>
      <ItemsBox>
        {subjects.map(({ name, Topics, color, id }) => {
          const topicId = Topics?.at(0)?.id;
          const href = Topics?.length ? `/subjects/${id}/${topicId}` : "";
          return (
            <CardWithItem
              key={`card-${name}`}
              href={href}
              title={name}
              subtitle={<Tags tags={Topics.map(({ name }) => name)} />}
            >
              <span className="text-xl">
                {(Math.random() * 100).toFixed(0)}%
              </span>
              <span className="text-xs text-gray-400">Completado</span>
            </CardWithItem>
          );
        })}
      </ItemsBox>
      <h2 className="text-2xl font-semibold mt-4">Documentos guardados</h2>
      <ItemsBox size="sm">
        <DocsCards />
      </ItemsBox>
    </>
  );
}
