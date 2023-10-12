import Button from "@components/Button";
import Table from "@components/Table";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";
import Modal from "src/app/components/modal/modal";
import UpdateForm from "./components/forms/update";
import api from "src/app/utils/api";
import { auth } from "@clerk/nextjs";
import { Group, Organization, User } from "@prisma/client";
import SearchModal from "src/app/components/modal/search-modal";

interface GroupsWithUsers extends Group {
  Users: User[];
}
interface OrganizationsWithGroups extends Organization {
  Groups: GroupsWithUsers[];
}

export default async function OrganizationDashboardPage({
  searchParams,
}: {
  searchParams: { organization: string };
}) {
  const { getToken } = auth();
  const token = await getToken();
  const { data: organization } = (await api("organizations/1", {
    headers: { Authorization: `Bearer ${token}` },
  })) as {
    data: OrganizationsWithGroups;
  };
  console.log(organization);
  return (
    <>
      <div className="flex justify-between items-center pb-1.5">
        <h3 className="text-xl font-semibold">{organization?.name}</h3>
        <span>
          <Button href="?modal=new-group">Crear grupo</Button>
        </span>
      </div>
      <section className="flex flex-col gap-5">
        {organization?.Groups.map(({ name, id, Users }) => (
          <Table
            key={"AAA"}
            data={Users.map(({ name, email }) => [name, email])}
            head={{
              title: name,
              keys: [
                { name: "Nombre", key: "name" },
                { name: "Correo", key: "email" },
              ],
              icons: [
                <Link href={"?modal="} key={'key={"AA"} '}>
                  <FontAwesomeIcon className="h-4 w-4" icon={faPen} />
                </Link>,
                // <InvitationBtns
                //   key={"4medio-invitation-btn"}
                //   groupId={1}
                //   role={Role.Student}
                //   organizationId={1}
                // />,
              ],
            }}
          />
        ))}
        <Table
          head={{
            keys: [
              { name: "Nombre", key: "name" },
              { name: "Correo", key: "email" },
            ],
            title: "4° Medio",
          }}
          data={[
            ["Felipe Pérez", "Felipeeperez3@gmail.com"],
            ["Felipe Pérez", "Felipeeperez3@gmail.com"],
            ["Felipe Pérez", "Felipeeperez3@gmail.com"],
            ["Felipe Pérez", "Felipeeperez3@gmail.com"],
            ["Felipe Pérez", "Felipeeperez3@gmail.com"],
            ["Felipe Pérez", "Felipeeperez3@gmail.com"],
          ]}
        />
      </section>
      <SearchModal title="Modificar grupo" id="new-group" searchParams={searchParams}>
        <UpdateForm />
      </SearchModal> 
    </>
  );
}
