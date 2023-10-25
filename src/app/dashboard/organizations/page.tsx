import { auth } from "@clerk/nextjs";
import Button from "@components/Button";
import Card from "@components/Card";
import CardItem from "@components/cards/card-item/card-item";
import NavigationCard from "@components/cards/navigationCard/NavigationCard";
import { faPerson, faPlus, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Organization } from "@prisma/client";
import React from "react";
import ItemsBox from "src/app/components/items-box/items-box";
import SearchModal from "src/app/components/modal/search-modal";
import api from "src/app/utils/api";
import CreateOrgForm from "./components/create-org";

export default async function Organizations({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const { getToken } = auth();
  const token = await getToken();
  const { data: organizations } = (await api(
    "organizations",
    { headers: { Authorization: `Bearer ${token}` } },
    ["organizations"]
  )) as {
    data: ({
      _count: {
        Users: number;
      };
    } & Organization)[];
  };

  const totalUsers = organizations
    .map(({ _count: { Users } }) => Users)
    .reduce((a, b) => a + b);

  console.log(totalUsers);
  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold">Organizaciones</h2>
        <Button href="?modal=create">
          Crear <FontAwesomeIcon className="h-3 w-3" icon={faPlus} />
        </Button>
      </div>
      <Card className="flex justify-around ">
        <CardItem
          title="Organizaciones"
          value={String(organizations?.length)}
        />
        <CardItem title="Usuarios" value={String(totalUsers)} />
      </Card>
      <ItemsBox>
        {organizations?.map(({ id, name, _count: { Users: users_count } }) => (
          <NavigationCard
            key={`organization-card-${id}`}
            href={`organizations/${id}`}
          >
            <div className="flex w-full justify-between pr-2 items-center">
              <span>{name}</span>
              <span className="flex items-center gap-1 text-xs py-0.5 px-1 rounded-sm">
                {users_count}{" "}
                <FontAwesomeIcon className="h-3 w-3" icon={faUser} />
              </span>
            </div>
          </NavigationCard>
        ))}
      </ItemsBox>
      <SearchModal title="Crear organización" id="create" searchParams={searchParams}>
        <CreateOrgForm/>
      </SearchModal>
    </>
  );
}
