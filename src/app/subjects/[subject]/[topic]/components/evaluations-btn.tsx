import { auth, currentUser } from "@clerk/nextjs";
import NavigationCard from "@components/cards/navigationCard/NavigationCard";
import React from "react";

export default async function EvaluationsBtn() {
  const user = await currentUser();
  const organization = user?.publicMetadata?.organizationId;
  // console.log(userId);
  return (
    <NavigationCard href={`evaluations/${organization}/all`}>
      Evaluaciones
    </NavigationCard>
  );
}
