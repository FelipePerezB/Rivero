import { currentUser } from "@clerk/nextjs";
import Card from "@components/cards/Card";
import LargeSkeleton from "@components/layout/loading-skeleton/large-skeleton/large-skeleton";
import RowSkeleton from "@components/layout/loading-skeleton/row-skeleton/row-skeleton";
import SmallSkeleton from "@components/layout/loading-skeleton/small-skeleton";
import { Organization } from "@prisma/client";
import React, { Suspense } from "react";
import api from "src/utils/api";

const OrganizationName = async () => {
  const user = await currentUser();
  const organizationId = user?.publicMetadata?.organizationId;

  const { data: organization }: { data: Organization } = organizationId
    ? await api(`organizations/${organizationId}`, {}, [
        `organization/${organizationId}`,
      ])
    : {};
  const organizationName = organization?.name ?? "Sin institución";
  return (
    <h3 className="text-sm w-max sm:text-lg text-center font-medium">
      {organizationName}
    </h3>
  );
};

export default async function OrganizationCard() {
  return (
    <Card href="?modal=organization" interactive className="flex flex-col items-center flex-grow md:w-52">
      <Suspense fallback={<SmallSkeleton />}>
        <OrganizationName />
      </Suspense>
      <span className="font-thin text-sm ">{"Institución"}</span>
    </Card>
  );
}
