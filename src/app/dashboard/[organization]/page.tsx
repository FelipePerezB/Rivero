import Button from "@components/Button";
import Table from "@components/table/Table";
import { faPen, faPlus, faTrash, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";
import Modal from "src/app/components/modal/modal";
import UpdateForm from "./components/forms/update";
import api from "src/app/utils/api";
import { auth } from "@clerk/nextjs";
import { Group, Organization, Role, User } from "@prisma/client";
import SearchModal from "src/app/components/modal/search-modal";
import capFirst from "src/utils/capFirst";
import InviteForm from "./components/forms/invite";
import { Toaster } from "react-hot-toast";
import EditableLabel from "src/app/documents/[subject]/[topic]/components/editable-label";
import DeleteBtn from "src/app/components/admin/delete-btn/delete-btn";

interface GroupsWithUsers extends Group {
  Users: User[];
}
interface OrganizationsWithGroups extends Organization {
  Groups: GroupsWithUsers[];
}

export default async function OrganizationDashboardPage({
  searchParams,
  params: { organization: organizationId },
}: {
  searchParams: { groups?: string; modal?: string; role?: Role };
  params: { [key: string]: string };
}) {
  const { getToken } = auth();
  const token = await getToken();
  const { data: organization } = (await api(`organizations/${organizationId}`, {
    headers: { Authorization: `Bearer ${token}` },
  })) as {
    data: OrganizationsWithGroups;
  };
  return (
    <>
      <div className="flex justify-between items-center pb-1.5">
        <EditableLabel
          tags={["organizations"]}
          endpoint={`organizations/${organizationId}`}
          text={organization.name}
          token={token}
          className="text-xl font-semibold"
        />
        <span>
          <Button href="?modal=new-group">Crear grupo</Button>
        </span>
      </div>
      <section className="flex flex-col gap-5">
        {organization?.Groups.map(({ name, id, Users }) => (
          <Table
            key={`table-${name}`}
            data={Users.map(({ name, email, lastname }) => [
              capFirst(name),
              capFirst(lastname),
              email,
            ])}
            head={{
              title: (
                <EditableLabel
                  endpoint={`groups/${organizationId}/${id}`}
                  tags={[`groups/${organizationId}`]}
                  token={token ?? undefined}
                  text={name}
                />
              ),
              keys: [
                { name: "Nombre", key: "name" },
                { name: "Apellido", key: "lastname" },
                { name: "Correo", key: "email" },
              ],
              icons: [
                <Link
                  className="flex gap-1 items-center hover:text-blue-500 p-1 rounded-sm"
                  href={`?modal=invite&groups=${id}&role=${Role.STUDENT}`}
                  key={"invite-btn"}
                >
                  <span>Invitar</span>
                  <FontAwesomeIcon className="h-3 w-3" icon={faPlus} />
                </Link>,
                <DeleteBtn
                  name={name}
                  endpoint={`groups/${organizationId}/${id}`}
                  key={`delete-table-${id}`}
                />,
              ],
            }}
          />
        ))}
      </section>
      <SearchModal
        title="Crear nuevo grupo"
        id="new-group"
        searchParams={searchParams}
      >
        <UpdateForm token={token ?? undefined} />
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
            groups={[1]}
          />
        )}
      </SearchModal>
      <Toaster />
    </>
  );
}
