import { currentUser } from "@clerk/nextjs";
import NavigationCard from "@components/cards/NavigationCard";
import { Role } from "@prisma/client";
import React from "react";

export default async function EvaluationsBtn({subject, topic}: {subject: string, topic: string}) {
  const user = await currentUser();
  const organization = user?.publicMetadata?.organizationId;
  return (
    <NavigationCard
      href={
        user?.publicMetadata.role === Role.ADMIN
          ? `/dashboard/subjects/${subject}/${topic}`
          : `evaluations/${organization}/all`
      }
    >
      Evaluaciones
    </NavigationCard>
  );
}
