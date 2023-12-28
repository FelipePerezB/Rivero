import Button from "@components/common/buttons/button/button";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Group, Organization } from "@prisma/client";
import React from "react";
import api from "src/utils/api";
import ItemsBox from "@components/containers/items-box/items-box";
import CardItem from "@components/cards/card-item";
import NavigationCard from "@components/cards/NavigationCard";
import Card from "@components/cards/Card";
import CreateBtnWithName from "@components/admin/create-btn/create-btn-with-name";

export default async function Organizations() {
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
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold">Organizaciones</h2>
        <div className="flex gap-2.5">
          <CreateBtnWithName endpoint="organizations"/>
          <Button href="admins" color="white">
            Administradores
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
      <ItemsBox>
        {organizations?.map(
          ({ id, name, _count: { Users: users_count }, Groups }) => (
            <NavigationCard
              key={`organization-card-${id}`}
              href={`organizations/${id}/all`}
            >
              <div className="flex w-full justify-between pr-2 items-center">
                <span>{name}</span>
                <span className="flex items-center gap-1 text-xs py-0.5 px-1 rounded-sm">
                  {users_count}{" "}
                  <FontAwesomeIcon className="h-3 w-3" icon={faUser} />
                </span>
              </div>
            </NavigationCard>
          )
        )}
      </ItemsBox>
    </>
  );
}
