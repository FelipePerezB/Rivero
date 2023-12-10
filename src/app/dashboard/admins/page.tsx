import Table from "@components/dashboard/table/Table";
import TableBtn from "@components/dashboard/table/table-btn/table-btn";
import SearchModal from "@components/modal/search-modal";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Role, User } from "@prisma/client";
import React, { use } from "react";
import api from "src/utils/api";
import UpdateUserForm from "../organizations/[id]/[group]/components/forms/update-user-form";
import RemoveAdmin from "./remove-admin";
import AddAdminBtn from "./add-admin";

export default async function AdminsPage({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  console.log(searchParams);
  const { data: admins } = (await api("users/admins", {cache: "no-store"}, ["admins"])) as { data: User[] };
  const data = admins?.map(({ email, name, lastname, externalId }) => [
    externalId,
    `${name} ${lastname}`,
    email,
  ]);
  const user = admins.find(({ externalId }) => searchParams.id === externalId);
  return (
    <>
      <Table
        onClickHref="?modal=update&id=[id]"
        head={{
          icons: [<AddAdminBtn key={"add-admin-btn"} />],
          title: "Administradores",
          keys: [
            { name: "ID", key: "id" },
            { name: "Nombre", key: "name" },
            { name: "Correo", key: "email" },
          ],
        }}
        data={data}
      />
      <SearchModal
        title="Actualizar usuario"
        id="update"
        searchParams={searchParams}
      >
        <RemoveAdmin id={user?.externalId as string} />
        <UpdateUserForm
          email={user?.email}
          name={user?.name}
          lastname={user?.lastname ?? ""}
        />
      </SearchModal>
    </>
  );
}
