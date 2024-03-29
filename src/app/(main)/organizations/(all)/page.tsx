import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Group, Organization, User } from "@prisma/client";
import React, { Suspense } from "react";
import api from "src/utils/api";
import ItemsBox from "@components/containers/items-box/items-box";
import CardItem from "@components/cards/card-item";
import NavigationCard from "@components/cards/NavigationCard";
import Card from "@components/cards/Card";
import CreateBtnWithName from "@components/admin/create-btn/create-btn-with-name";
import Table from "@components/dashboard/table/Table";
import Section from "@components/containers/section";
import SectionTitle from "@components/common/titles/section-title/section-title";
import TableSkeleton from "@components/layout/loading-skeleton/table-skeleton/table-skeleton";
import XsSkeleton from "@components/layout/loading-skeleton/xs-skeleton";
import CardSkeleton from "@components/cards/card-skeleton";

export default async function OrganizationsPage() {
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
          </div>
        </div>
        <Suspense
          fallback={
            <>
              <Card className="flex justify-around ">
                <CardItem title="Organizaciones" value={<XsSkeleton />} />
                <CardItem title="Usuarios" value={<XsSkeleton />} />
              </Card>
              <ItemsBox size="lg">
                <CardSkeleton/>
                <CardSkeleton/>
                <CardSkeleton/>
                <CardSkeleton/>
                <CardSkeleton/>
                <CardSkeleton/>
              </ItemsBox>
            </>
          }
        >
          <OrganizationsData />
        </Suspense>
      </Section>
      <Section>
        <Suspense fallback={<TableSkeleton />}>
          <AdminsTable />
        </Suspense>
      </Section>
    </>
  );
}

async function OrganizationsData() {
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

  return (
    <>
      <Card className="flex justify-around ">
        <CardItem
          title="Organizaciones"
          value={String(organizations?.length)}
        />
        <CardItem title="Usuarios" value={String(totalUsers)} />
      </Card>
      <ItemsBox size="lg">
        {organizations?.map(({ id, name, _count: { Users: users_count } }) => (
          <NavigationCard
            key={`organization-card-${id}`}
            href={`organizations/${id}/all`}
          >
            <div className="flex w-full justify-between pr-2 items-center">
              <span className="text-ellipsis overflow-hidden whitespace-nowrap">
                {name}
              </span>
              <span className="flex items-center gap-1 text-xs py-0.5 px-1 rounded-sm">
                {users_count}{" "}
                <FontAwesomeIcon className="h-3 w-3" icon={faUser} />
              </span>
            </div>
          </NavigationCard>
        ))}
      </ItemsBox>
    </>
  );
}

async function AdminsTable() {
  const { data: admins } = (await api("users/admins", {}, ["admins"])) as {
    data: User[];
  };

  const data = admins?.map(({ email, name, lastname, externalId }) => [
    externalId,
    `${name} ${lastname}`,
    email,
  ]);

  return (
    <Table
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
  );
}
