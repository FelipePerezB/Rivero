import CreateBtnWithName from "@components/admin/create-btn/create-btn-with-name";
import UpdateSearchModal from "@components/admin/update-form/update-search-modal";
import React from "react";
import InviteForm from "../[group]/components/forms/Invite";
import DeleteBtn from "@components/admin/delete-btn/delete-btn";
import Button from "@components/common/buttons/button/button";
import { Organization, Role } from "@prisma/client";
import { currentUser } from "@clerk/nextjs";

export default async function OrgForm({
  searchParams,
  organizationId,
  organization,
}: {
  searchParams: { [key: string]: string };
  organizationId: string;
  organization: Organization;
}) {
  const user = await currentUser();
  const role = user?.publicMetadata?.role as Role;
  return (
    <>
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
    </>
  );
}
