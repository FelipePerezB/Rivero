import { Group, Role, User } from "@prisma/client";
import CardWithItem from "@components/cards/card-with-item";
import ItemsBox from "@components/containers/items-box/items-box";
import React from "react";
import api from "src/utils/api";

interface GroupWithusers extends Group {
  Users: User[];
}

export default async function GroupList({
  organizationId,
}: {
  organizationId: string;
}) {
  const { data: groups } = (await api(`groups/${organizationId}`, {})) as {
    data: GroupWithusers[];
  };
  return !!groups.length ? (
    <>
      <ItemsBox>
        {groups.map(({ name, id, Users }) => {
          const students = Users.filter(({ role }) => role === Role.STUDENT);
          const teachers = Users.filter(({ role }) => role === Role.TEACHER);
          return (
            <CardWithItem
              href={`${id}`}
              title={name}
              subtitle={
                !!teachers.length ?
                `Docentes: ${teachers.map(({ name }) => name).join(", ")}` : "¡Invita a docentes!"
              }
              key={`group-card-${id}`}
            >
              <p className="text-center">
                {`${students?.length} estudiantes`}
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
