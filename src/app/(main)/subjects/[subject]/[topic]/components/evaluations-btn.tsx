import { currentUser } from "@clerk/nextjs";
import NavigationCard from "@components/cards/NavigationCard";
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
    <NavigationCard
      href={
        isAdmin
          ? `/dashboard/subjects/${subject}/${topic}`
          : `evaluations/${organization}/all`
      }
    >
     {isAdmin ? "Modificar asignatura" : "Evaluaciones"}
    </NavigationCard>
  );
}
