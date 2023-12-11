import React from "react";
import GroupList from "./GroupList/group-list";
import UpdateAlert from "@components/admin/update-alert/update-alert";
import CreateGroupBtn from "../[group]/components/create-group-btn";
import api from "src/utils/api";
import { Organization } from "@prisma/client";

export default async function AllGroupsOrganizationPage({
  params: { id: organizationId },
}: {
  params: { [key: string]: string };
}) {
  const endpoint = `organizations/${organizationId}`;
  const { data: organization } = (await api(endpoint, {}, [endpoint])) as {
    data: Organization;
  };
  return (
    <>
      <div className="flex justify-between items-center pb-1.5">
        <div className="flex gap-1">
          <h2 className="text-3xl font-semibold">{organization?.name}</h2>
          <UpdateAlert
            size="sm"
            endpoint={`organizations/${organization?.id}`}
            value={organization?.name}
          />
        </div>
        <CreateGroupBtn organizationId={String(organization?.id)} />
      </div>
      <GroupList organization={organizationId} />
    </>
  );
}
