import { currentUser } from "@clerk/nextjs";
import Card from "@components/cards/Card";
import Button from "@components/common/buttons/button/button";
import SmallTitle from "@components/common/titles/small-title";
import Section from "@components/containers/section";
import XsSkeleton from "@components/layout/loading-skeleton/xs-skeleton";
import { faCheck, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Invitation, Messages, Organization } from "@prisma/client";
import React, { Suspense } from "react";
import api from "src/utils/api";
import RejectInvitationBtn from "./reject-invitation-btn";
import AcceptInvitationBtn from "./accept-invitation-btn";

async function InvitationOrg({
  organizationId,
}: {
  organizationId: string | number;
}) {
  const { data: organization }: { data: Organization } = organizationId
    ? await api(`organizations/${organizationId}`, {}, [
        `organization/${organizationId}`,
      ])
    : {};
  const organizationName = organization?.name ?? "Sin institución";
  return <SmallTitle>{organizationName}</SmallTitle>;
}

export default async function OrganizationModal() {
  const user = await currentUser();
  const organizationId = user?.publicMetadata?.organizationId;
  const email = user?.emailAddresses[0]?.emailAddress;

  const { data: organization }: { data: Organization } = organizationId
    ? await api(`organizations/${organizationId}`, {}, [
        `organization/${organizationId}`,
      ])
    : {};

  const { data: invitations } = (await api(`auth/invitation/email/${email}`, {
    cache: "no-store",
  })) as { data?: Invitation[] };

  const pendingInvitations = invitations?.filter(
    ({ msg }) => msg === Messages.CONFIRMATION_REQUIRED
  );

  return (
    <Section>
      <div className="flex flex-col gap-1">
        <SmallTitle>{organization?.name ?? "Sin institución"}</SmallTitle>
        <p className="text-sm font-light">
          {organization?.name
            ? "Gestiona tus invitaciones"
            : "¡Unete a una institución para acceder a evaluaciones y más cosas!"}
        </p>
      </div>
      {pendingInvitations?.map(({ id, organizationId, role, updateAt }) => (
        <Card
          className="flex justify-between items-center"
          key={`invitation-pending-${id}`}
        >
          <div className="flex flex-col gap-1 justify-between">
            <Suspense fallback={<XsSkeleton />}>
              <InvitationOrg organizationId={organizationId} />
            </Suspense>
            <span className="text-xs font-light">{role}</span>
          </div>
          <div className="flex gap-sm">
            <AcceptInvitationBtn organizationId={organizationId} id={id} />
            <RejectInvitationBtn id={id} />
          </div>
        </Card>
      ))}
    </Section>
  );
}
