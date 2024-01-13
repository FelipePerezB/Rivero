import { currentUser } from "@clerk/nextjs";
import Card from "@components/cards/Card";
import { Organization } from "@prisma/client";
import React from "react";
import api from "src/utils/api";

export default async function OrganizationCard() {
  const user = await currentUser();
  const organizationId = user?.publicMetadata?.organizationId;

  const { data: organization }: { data: Organization } = organizationId
    ? await api(`organizations/${organizationId}`, {}, [
        `organization/${organizationId}`,
      ])
    : {};
  const organizationName = organization?.name ?? "Sin institución";

  return (
    <Card interactive className="flex flex-col items-center flex-grow">
      <span className="text-sm w-max sm:text-lg text-center font-medium">{organizationName}</span>
      <span className="font-thin text-sm ">
        {organizationName && "Institución"}
      </span>
    </Card>
  );
}
