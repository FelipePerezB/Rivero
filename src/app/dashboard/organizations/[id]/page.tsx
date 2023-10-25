import Button from "@components/Button";
import React, { Suspense } from "react";
import UpdateForm from "./components/forms/update";
import api from "src/app/utils/api";
import { Organization, Role } from "@prisma/client";
import SearchModal from "src/app/components/modal/search-modal";
import InviteForm from "./components/forms/invite";
import { Toaster } from "react-hot-toast";
import EditableLabel from "src/app/subjects/[subject]/[topic]/components/editable-label";
import GroupsTables from "./components/forms/groups-tables";
import TableSkeleton from "src/app/components/loading-skeleton/table-skeleton/table-skeleton";

export default async function OrganizationDashboardPage({
  searchParams,
  params: { id: organizationId },
}: {
  searchParams: { groups?: string; modal?: string; role?: Role };
  params: { [key: string]: string };
}) {
  const endpoint = `organizations/${organizationId}`;
  const { data: organization } = (await api(endpoint, {}, [endpoint])) as {
    data: Organization;
  };
  return (
    <>
      <div className="flex justify-between items-center pb-1.5">
        <EditableLabel
          endpoint={`organizations/${organizationId}`}
          text={organization.name}
          className="text-xl font-semibold"
        />
        <Button href="?modal=new-group">Crear grupo</Button>
      </div>
      <section className="flex flex-col gap-5">
        <Suspense
          fallback={
            <>
              <TableSkeleton />
              <TableSkeleton />
            </>
          }
        >
          <GroupsTables organizationId={organizationId} />
        </Suspense>
      </section>
      <SearchModal
        title="Crear nuevo grupo"
        id="new-group"
        searchParams={searchParams}
      >
        <UpdateForm organization={organizationId} />
      </SearchModal>
      <SearchModal
        title="Invitar usuarios"
        id="invite"
        searchParams={searchParams}
      >
        {!!searchParams.role && (
          <InviteForm
            role={searchParams?.role}
            organization={Number(organizationId)}
            groups={[Number(searchParams?.groups)]}
          />
        )}
      </SearchModal>
      <Toaster />
    </>
  );
}
