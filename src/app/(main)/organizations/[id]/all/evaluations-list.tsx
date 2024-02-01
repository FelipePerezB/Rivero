import { Group, Role, Subject, User } from "@prisma/client";
import CardWithItem from "@components/cards/card-with-item";
import ItemsBox from "@components/containers/items-box/items-box";
import React from "react";
import api from "src/utils/api";
import NavigationCard from "@components/cards/NavigationCard";

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
      <ItemsBox>
        {subjects.map(({ name, id }) => {
          return (
            <NavigationCard
              href={`/subjects/${id}/evaluations/${organizationId}/all`}
              key={`nav-card-evaluation-${id}`}
            >
              {name}
            </NavigationCard>
          );
        })}
      </ItemsBox>
    </>
  ) : (
    <></>
  );
}
