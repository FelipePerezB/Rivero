import LinkCard from "@components/navigation/link-card";
import { Role } from "@prisma/client";
import React from "react";
import getUser from "src/utils/getUser";

export default async function EvaluationsBtn({
  subject,
  topic,
}: {
  subject: string;
  topic: string;
}) {
  const user = await getUser();
  const organization = user?.publicMetadata?.organizationId;
  const isAdmin = user?.publicMetadata.role === Role.ADMIN;
  return (
    <LinkCard
      href={
        isAdmin
          ? `/dashboard/subjects/${subject}/${topic}`
          : `evaluations/${organization}/all`
      }
      description={isAdmin ? "Administra la asignatura" : "Evaluaciones"}
      title={isAdmin ? "Modificar" : "Evaluaciones"}
    />
  );
}
