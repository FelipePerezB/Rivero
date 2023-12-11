import { Group, Role, User } from "@prisma/client";
import CardWithItem from "@components/cards/card-with-item";
import ItemsBox from "@components/containers/items-box/items-box";
import React from "react";
import api from "src/utils/api";

interface GroupWithusers extends Group {
  Users: User[];
}

export default async function GroupList({
  organization,
}: {
  organization: string;
}) {
  const { data: groups } = (await api(`groups/${organization}`, {})) as {
    data: GroupWithusers[];
  };
  return !!groups.length ? (
    <>
      <h3 className="text-xl font-semibold">Grupos</h3>
      <ItemsBox>
        {groups.map(({ name, id, Users }) => {
          const students = Users.filter(({ role }) => role === Role.STUDENT);
          const teachers = Users.filter(({ role }) => role === Role.TEACHER);
          return (
            <CardWithItem
              href={`${id}`}
              title={name}
              subtitle={
                !!teachers.length &&
                `Docentes: ${teachers.map(({ name }) => name).join(", ")}`
              }
              key={`group-card-${id}`}
            >
              <p className="text-center">
                {students?.length || "Invita estudiantes"}
              </p>
            </CardWithItem>
          );
        })}
      </ItemsBox>
    </>
  ) : (
    <></>
  );
}
