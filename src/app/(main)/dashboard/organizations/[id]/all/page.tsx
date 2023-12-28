import React from "react";
import GroupList from "./GroupList/group-list";
import CreateGroupBtn from "../[group]/components/create-group-btn";
import api from "src/utils/api";
import { Organization, Role } from "@prisma/client";
import DeleteBtn from "@components/admin/delete-btn/delete-btn";
import SearchModal from "@components/modal/search-modal";
import UpdateForm from "@components/admin/update-form/update-form";
import Button from "@components/common/buttons/button/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import InviteForm from "../[group]/components/forms/Invite";
import UpdateSearchModal from "@components/admin/update-form/update-search-modal";
import CreateBtnWithName from "@components/admin/create-btn/create-btn-with-name";
import getUser from "src/utils/getUser";

export default async function AllGroupsOrganizationPage({
  params: { id: organizationId },
  searchParams,
}: {
  searchParams: { [key: string]: string };
  params: { [key: string]: string };
}) {
  const endpoint = `organizations/${organizationId}`;
  const { data: organization } = (await api(endpoint, {}, [endpoint])) as {
    data: Organization;
  };
  const user = await getUser();
  const role = user?.publicMetadata?.role as Role;
  return (
    <>
      <div className="flex justify-between items-center pb-1.5">
        <h2 className="text-3xl font-semibold">{organization?.name}</h2>
        <div className="flex gap-2.5">
          <UpdateSearchModal
            data={organization}
            endpoint={`organizations/${organizationId}`}
            label="organización"
            searchParams={searchParams}
            secondaryBtn={
              <CreateBtnWithName
                color="white"
                label="grupo"
                endpoint="groups"
                values={{ organizationId }}
              />
            }
          >
            <InviteForm
              label="Email del director"
              role={Role.DIRECTOR}
              organization={Number(organizationId)}
            />
            <hr />
          </UpdateSearchModal>
          {role === Role.ADMIN ? (
            <DeleteBtn endpoint="organizations" size="md" />
          ) : (
            <Button color="white" href="/subjects/1/evaluations/1">
              Evaluaciones
            </Button>
          )}
        </div>
      </div>
      <GroupList organization={organizationId} />
    </>
  );
}
