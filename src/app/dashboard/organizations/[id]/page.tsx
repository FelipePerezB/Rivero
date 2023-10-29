import Button from "@components/Button";
import React, { Suspense } from "react";
import UpdateForm from "./components/forms/update-user-form";
import api from "src/app/utils/api";
import { Organization, Role } from "@prisma/client";
import SearchModal from "src/app/components/modal/search-modal";
import InviteForm from "./components/forms/invite";
import { Toaster } from "react-hot-toast";
import EditableLabel from "src/app/subjects/[subject]/[topic]/components/editable-label";
import GroupsTables from "./components/forms/groups-tables";
import TableSkeleton from "src/app/components/loading-skeleton/table-skeleton/table-skeleton";
import UpdateAlert from "src/app/components/admin/update-alert/update-alert";
import UpdateUserForm from "./components/forms/update-user-form";
import CreateBtn from "src/app/components/admin/create-btn/create-btn";
// import CreateAlert from "src/app/components/admin/create-alert/create-alert";
import CreateGroupBtn from "./components/create-group-btn";

export default async function OrganizationDashboardPage({
  searchParams,
  params: { id: organizationId },
}: {
  searchParams: {
    groups?: string;
    modal?: string;
    role?: Role;
    name?: string;
    lastname?: string;
    email?: string;
  };
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
          <h2 className="text-xl font-semibold">{organization?.name}</h2>
          <UpdateAlert
            size="sm"
            endpoint={`organizations/${organization?.id}`}
            value={organization?.name}
          />
        </div>
        <CreateGroupBtn organizationId={String(organization?.id)} />
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
      {/* <SearchModal
        title="Crear nuevo grupo"
        id="new-group"
        searchParams={searchParams}
      >
        <UpdateForm organization={organizationId} />
      </SearchModal> */}
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
      <SearchModal
        title="Actualizar usuario"
        id="update-user"
        searchParams={searchParams}
      >
        <UpdateUserForm
          email={searchParams?.email}
          name={searchParams?.name}
          lastname={searchParams?.lastname}
        />
      </SearchModal>
      <Toaster />
    </>
  );
}
