import React, { Suspense } from "react";
import api from "src/utils/api";
import { Group, Organization, Role, User } from "@prisma/client";
import SearchModal from "@components/modal/search-modal";
import InviteForm from "./components/forms/Invite";
import { Toaster } from "react-hot-toast";
import TableSkeleton from "@components/layout/loading-skeleton/table-skeleton/table-skeleton";
import UpdateAlert from "@components/admin/update-alert/update-alert";
import UpdateUserForm from "./components/forms/update-user-form";
import GroupsList from "src/app/(main)/subjects/[subject]/evaluations/[organization]/[group]/components/groups-list";
import LargeSkeleton from "@components/layout/loading-skeleton/large-skeleton/large-skeleton";
import Invitations from "./components/invitattions/invitations";
import { auth } from "@clerk/nextjs";
import DeleteBtn from "@components/admin/delete-btn/delete-btn";
import capFirst from "src/utils/capFirst";
import RemoveGroupBtn from "./components/remove-group-btn";
// import TeacherTable from "./components/forms/teachers-table";
import Table from "@components/dashboard/table/Table";
import TableBtn from "@components/dashboard/table/table-btn/table-btn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import UpdateSearchModal from "@components/admin/update-form/update-search-modal";
import Button from "@components/common/buttons/button/button";
interface GroupWithUsers extends Group {
  Users: User[];
}

function GroupTable({
  name,
  role: tableRole,
  groupData,
}: {
  name: string;
  role: Role;
  groupData: GroupWithUsers;
}) {
  const { id, organizationId } = groupData;
  const users = groupData?.Users?.filter(({ role }) => role === tableRole).map(
    ({ email, name, lastname }) => [
      capFirst(name),
      capFirst(lastname ?? ""),
      email,
    ]
  );
  return (
    <Table
      onClickHref="?modal=update-user&name=[name]&lastname=[lastname]&email=[email]"
      head={{
        icons: [
          <TableBtn
            href={`?modal=invite&group=${id}&role=${Role[tableRole]}`}
            key={`invite-btn-${id}`}
          >
            <span>Invitar</span>
            <FontAwesomeIcon className="h-3 w-3" icon={faPlus} />
          </TableBtn>,
        ],
        title: capFirst(name),
        keys: [
          { name: "Nombre", key: "name" },
          { name: "Apellido", key: "lastname" },
          { name: "Correo", key: "email" },
        ],
      }}
      data={users}
    />
  );
}

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
  const TAG = `groups/${group}`;
  const ENDPOINT = `groups/${organizationId}/${group}`;
  const { data: groupData } = (await api(ENDPOINT, {}, [TAG])) as {
    data: GroupWithUsers;
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">{capFirst(groupData?.name)}</h2>
        <UpdateSearchModal
          data={{ ...groupData }}
          endpoint={ENDPOINT}
          label="grupo"
          searchParams={searchParams}
          secondaryBtn={
            <DeleteBtn size="md" name={groupData?.name} endpoint={ENDPOINT} />
          }
        >
          <InviteForm
            label="Correos a invitar"
            organization={Number(organizationId)}
            group={Number(group)}
          />
          <hr />
        </UpdateSearchModal>
      </div>
      <section className="flex flex-col gap-1">
        <Suspense fallback={<LargeSkeleton />}>
          <GroupsList group={group} organization={organizationId} />
        </Suspense>
        <div className="flex flex-col gap-5">
          <Suspense fallback={<TableSkeleton />}>
            <GroupTable
              groupData={groupData}
              role={Role.STUDENT}
              name="Estudiantes"
            />
          </Suspense>
          <Suspense fallback={<TableSkeleton />}>
            <GroupTable
              groupData={groupData}
              role={Role.TEACHER}
              name="Docentes"
            />
          </Suspense>
        </div>
      </section>
      <section>
        <Invitations group={group} organization={organizationId} />
      </section>
      {/* ------------------------------ */}
      {/* <SearchModal
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
      </SearchModal> */}
      <SearchModal
        title="Actualizar usuario"
        id="update-user"
        searchParams={searchParams}
      >
        {searchParams?.email && (
          <RemoveGroupBtn group={group} email={searchParams?.email} />
        )}
        <UpdateUserForm
          email={searchParams?.email}
          name={searchParams?.name}
          lastname={searchParams?.lastname}
        />
      </SearchModal>
    </>
  );
}
