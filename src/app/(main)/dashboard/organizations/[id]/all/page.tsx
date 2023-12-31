import React from "react";
import GroupList from "./GroupList/group-list";
import api from "src/utils/api";
import { Organization } from "@prisma/client";
import EvaluationsList from "./evaluations-list";
import dynamic from "next/dynamic";

export default async function AllGroupsOrganizationPage({
  params: { id: organizationId },
  searchParams,
}: {
  searchParams: { [key: string]: string };
  params: { [key: string]: string };
}) {
  const endpoint = `organizations/${organizationId}`;
  const { data: organization } = (await api(endpoint, {}, [endpoint])) as {
    data: Organization;
  };

  const OrgForm = dynamic(() => import("./org-form"));

  return (
    <>
      <div className="flex justify-between items-center pb-1.5">
        <h2 className="text-3xl font-semibold">{organization?.name}</h2>
        <div className="flex gap-2.5">
          <OrgForm
            organization={organization}
            organizationId={organizationId}
            searchParams={searchParams}
          />
        </div>
      </div>
      <GroupList organizationId={organizationId} />
      <EvaluationsList organizationId={organizationId} />
    </>
  );
}
