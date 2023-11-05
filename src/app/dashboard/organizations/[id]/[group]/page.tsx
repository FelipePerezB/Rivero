import React, { Suspense } from "react";
import api from "src/app/utils/api";
import { Group, Organization, Role } from "@prisma/client";
import SearchModal from "src/app/components/modal/search-modal";
import InviteForm from "./components/forms/invite";
import { Toaster } from "react-hot-toast";
import TableSkeleton from "src/app/components/loading-skeleton/table-skeleton/table-skeleton";
import UpdateAlert from "src/app/components/admin/update-alert/update-alert";
import UpdateUserForm from "./components/forms/update-user-form";
import CreateGroupBtn from "./components/create-group-btn";
import GroupsList from "src/app/subjects/[subject]/evaluations/[organization]/[group]/components/groups-list";
import LargeSkeleton from "src/app/components/loading-skeleton/large-skeleton/large-skeleton";
import GroupTable from "./components/group-table";
import Invitations from "./components/invitattions/invitations";
import { auth } from "@clerk/nextjs";
import capFirst from "src/utils/capFirst";
import Button from "@components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faXmark } from "@fortawesome/free-solid-svg-icons";
import DeleteBtn from "src/app/components/admin/delete-btn/delete-btn";
import UpdateBtn from "src/app/components/admin/update-btn/update-btn";

export default async function OrganizationDashboardPage({
  searchParams,
  params: { id: organizationId, group },
}: {
  searchParams: {
    group?: string;
    modal?: string;
    role?: Role;
    name?: string;
    lastname?: string;
    email?: string;
  };
  params: { [key: string]: string };
}) {
  const { getToken } = auth();
  const token = await getToken();
  const {
    data: { name },
  } = (await api(`groups/${organizationId}/${group}`, {
    headers: { Authorization: `Bearer ${token}` },
  })) as { data: Group };

  return (
    <>
      <div className="flex items-center justify-between">
        <Suspense fallback={<LargeSkeleton />}>
          <div className="flex gap-2">
            <h2 className="text-2xl font-semibold">{capFirst(name)}</h2>
            <UpdateAlert
              size="sm"
              key={`edit-btn-${group}`}
              endpoint={`groups/${organizationId}/${group}`}
              value={name}
            />
          </div>
        </Suspense>
        <div className="flex gap-2">
          <DeleteBtn
          size="md"
            name={name}
            key={`delete-btn-${group}`}
            endpoint={`groups/${organizationId}/${group}`}
          />
        </div>
      </div>
      <section className="flex flex-col gap-1">
        <Suspense fallback={<LargeSkeleton />}>
          <GroupsList group={group} organization={organizationId} />
        </Suspense>
        <Suspense fallback={<TableSkeleton />}>
          <GroupTable group={group} organization={organizationId} />
        </Suspense>
      </section>
      <section>
        <Invitations group={group} organization={organizationId} />
      </section>
      {/* ------------------------------ */}
      <SearchModal
        title="Invitar usuarios"
        id="invite"
        searchParams={searchParams}
      >
        {!!searchParams.role && (
          <InviteForm
            role={searchParams?.role}
            organization={Number(organizationId)}
            group={Number(searchParams?.group)}
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