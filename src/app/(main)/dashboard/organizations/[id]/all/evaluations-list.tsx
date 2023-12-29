import { Group, Role, Subject, User } from "@prisma/client";
import CardWithItem from "@components/cards/card-with-item";
import ItemsBox from "@components/containers/items-box/items-box";
import React from "react";
import api from "src/utils/api";

export default async function EvaluationsList({
  organizationId,
}: {
  organizationId: string;
}) {
  const { subjects } = (await api(`subjects`, {}, ["subjects"])) as {
    subjects: Subject[];
  };
  return !!subjects?.length ? (
    <>
      <h3 className="text-xl font-semibold">Evaluaciones</h3>
      <ItemsBox>
        {subjects.map(({ name, id }) => {
          return (
            <CardWithItem
              href={`/subjects/${id}/evaluations/${organizationId}/all`}
              title={name}
              subtitle={"12 ensayos"}
              key={`evaluation-card-${id}`}
            >
              <div className="flex flex-col items-center">
                <span className="text-2xl font-semibold">920</span>
                <span>Puntos</span>
              </div>
            </CardWithItem>
          );
        })}
      </ItemsBox>
    </>
  ) : (
    <></>
  );
}
