import Button from "@components/common/buttons/button/button";
import { faPlus, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Group, Organization, User } from "@prisma/client";
import React from "react";
import api from "src/utils/api";
import ItemsBox from "@components/containers/items-box/items-box";
import CardItem from "@components/cards/card-item";
import NavigationCard from "@components/cards/NavigationCard";
import Card from "@components/cards/Card";
import CreateBtnWithName from "@components/admin/create-btn/create-btn-with-name";
import Table from "@components/dashboard/table/Table";
import AddAdminBtn from "../admins/add-admin";
import SearchModal from "@components/modal/search-modal";
import RemoveAdmin from "../admins/remove-admin";
import UpdateUserForm from "./[id]/[group]/components/forms/update-user-form";
import Section from "@components/containers/section";
import SectionTitle from "@components/common/titles/section-title";

export default async function Organizations({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const { data: organizations } = (await api("organizations", {}, [
    "organizations",
  ])) as {
    data: ({
      Groups: Group[];
      _count: {
        Users: number;
      };
    } & Organization)[];
  };

  const totalUsers = organizations
    .map(({ _count: { Users } }) => Users)
    .reduce((a, b) => a + b, 0);

  const { data: admins } = (await api("users/admins", {}, ["admins"])) as {
    data: User[];
  };

  const data = admins?.map(({ email, name, lastname, externalId }) => [
    externalId,
    `${name} ${lastname}`,
    email,
  ]);
  const user = admins?.find(({ externalId }) => searchParams.id === externalId);
  return (
    <>
      <Section>
        <SectionTitle
          title="Usuarios"
          subTitle="Administra usuarios, organizaciones y administradores"
        />
        <div className="flex justify-between">
          <h2 className="text-xl font-semibold">Organizaciones</h2>
          <div className="flex gap-2.5">
            <CreateBtnWithName endpoint="organizations" />
            <Button href="?modal=new-admin" color="white">
              Administradores
              <FontAwesomeIcon className="h-3 w-3" icon={faPlus} />
            </Button>
          </div>
        </div>
        <Card className="flex justify-around ">
          <CardItem
            title="Organizaciones"
            value={String(organizations?.length)}
          />
          <CardItem title="Usuarios" value={String(totalUsers)} />
        </Card>
        <ItemsBox size="sm">
          {organizations?.map(
            ({ id, name, _count: { Users: users_count }, Groups }) => (
              <NavigationCard
                key={`organization-card-${id}`}
                href={`organizations/${id}/all`}
              >
                <div className="flex w-full justify-between pr-2 items-center">
                  <span className="text-ellipsis overflow-hidden whitespace-nowrap">{name}</span>
                  <span className="flex items-center gap-1 text-xs py-0.5 px-1 rounded-sm">
                    {users_count}{" "}
                    <FontAwesomeIcon className="h-3 w-3" icon={faUser} />
                  </span>
                </div>
              </NavigationCard>
            )
          )}
        </ItemsBox>
      </Section>
      <Section>
        <Table
          onClickHref="?modal=update&id=[id]"
          head={{
            title: "Administradores",
            keys: [
              { name: "ID", key: "id" },
              { name: "Nombre", key: "name" },
              { name: "Correo", key: "email" },
            ],
          }}
          data={data}
        />
      </Section>

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

      <SearchModal
        id="new-admin"
        searchParams={searchParams}
        title="Nuevo admin"
      >
        <AddAdminBtn key={"add-admin-btn"} />
      </SearchModal>
    </>
  );
}
