import Button from "@components/common/buttons/button/button";
import SectionTitle from "@components/common/titles/section-title";
import Section from "@components/containers/section";
import SearchModal from "@components/modal/search-modal";
import {
  faExclamationTriangle,
  faHourglassStart,
  faPaperPlane,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Group,
  Invitation,
  Messages,
  Organization,
  Role,
  Status,
} from "@prisma/client";
import React, { Suspense } from "react";
import api from "src/utils/api";

import InvitationsForm from "../components/invitations-form";
import Card from "@components/cards/Card";
import ItemsBox from "@components/containers/items-box/items-box";
import Options from "@components/navigation/options/options";
import OrganizationProtect from "@components/admin/protect/organization-protect";
import LargeSkeleton from "@components/layout/loading-skeleton/large-skeleton/large-skeleton";
import { auth } from "@clerk/nextjs";

interface OrganizationWithGroups extends Organization {
  Groups: Group[];
}

type StatusType = Status | "all";

const InvitationSkeleton = () => (
  <Card>
    <LargeSkeleton />
  </Card>
);

export default async function InvitationsPage({
  params: { group, id: organizationId, status },
  searchParams,
}: {
  params: { group: string; id: string; status: StatusType };
  searchParams: { [key: string]: string; status: string };
}) {
  const endpoint = `organizations/${organizationId}`;
  const { data: organization } = (await api(endpoint, {}, [endpoint])) as {
    data: OrganizationWithGroups;
  };

  const groupName = organization?.Groups?.find(
    ({ id }) => id === Number(group)
  )?.name;

  const options = Object.values(Status);
  console.log(options);
  return (
    <OrganizationProtect organizationId={organizationId}>
      <Section>
        <div className="flex flex-col gap-sm sm:flex-row sm:justify-between sm:items-center">
          <SectionTitle
            title={"Invitaciones"}
            subTitle={`Invitar estudiantes y profesores a ${groupName}.`}
          />
          <Button href="?modal=invitate">
            Invitar{" "}
            <FontAwesomeIcon className="h-2.5 w-2.5" icon={faPaperPlane} />{" "}
          </Button>
          <SearchModal
            id="invitate"
            searchParams={searchParams}
            title="Invitar usuarios"
          >
            <InvitationsForm
              group={Number(group)}
              organization={Number(organizationId)}
            />
          </SearchModal>
        </div>
        <Options
          // customPath="?status=[key]"
          option={status}
          options={[
            { title: "Todas", key: "all" },
            { title: "Pendientes", key: Status.PENDING },
            { title: "Aceptadas", key: Status.RESOLVED },
            { title: "Fallidas", key: Status.REJECTED },
          ]}
        />
      </Section>
      <Suspense
        fallback={
          <Section>
            <ItemsBox size="lg">
              <InvitationSkeleton/>
              <InvitationSkeleton/>
              <InvitationSkeleton/>
              <InvitationSkeleton/>
              <InvitationSkeleton/>
              <InvitationSkeleton/>
              <InvitationSkeleton/>
              <InvitationSkeleton/>
            </ItemsBox>
          </Section>
        }
      >
        <Invitations
          status={status}
          group={group}
          searchParams={searchParams}
        />
      </Suspense>
    </OrganizationProtect>
  );
}

const Invitations = async ({
  searchParams,
  group,
  status,
}: {
  group: string;
  status: StatusType;
  searchParams: { [key: string]: string; status: string };
}) => {
  const { getToken } = auth();
  const token = await getToken();
  const { data: invitations } = (await api(
    `auth/invitation/group/${group}/${status === "all" ? "" : status}`,
    { cache: "no-store", headers: { Authorization: `Bearer ${token}` } }
  )) as {
    data: Invitation[];
  };
  const invitation = searchParams?.id
    ? invitations.find(({ id }) => id === Number(searchParams?.id))
    : undefined;

  const messageCode = invitation?.msg;
  const messages = {
    [Messages.INVALID_EMAIL]: "El email es invalido",
    [Messages.CANCELLED]: "La invitación ha sido cancelada",
    [Messages.CHANGED_GROUP]: "Se ha logrado cambiar el grupo del usuario",
    [Messages.CONFIRMATION_REQUIRED]: "Es necesaria confirmación del usuario",
    [Messages.DUPLICATED_RECORD]:
      "Invitación dúplicada, pidale al usuario crearse una cuenta para poder invitarlo",
    [Messages.INVITATION_SENT]: "Invitación ya enviada anteriormente",
    [Messages.REJECTED]: "El usuario ha rechazado la invitación",
    [Messages.RESOLVED]: "Usuario agregado correctamente al curso",
    "": "",
  };

  const indicators = {
    [Status.RESOLVED]: {
      icon: <FontAwesomeIcon className="w-6 h-6" icon={faThumbsUp} />,
      title: "Invitación aceptada",
    },
    [Status.PENDING]: {
      icon: (
        <FontAwesomeIcon
          className="w-6 h-6 animate-pulse"
          icon={faHourglassStart}
        />
      ),
      title: "Invitación pendiente",
    },
    [Status.REJECTED]: {
      icon: (
        <FontAwesomeIcon className="w-6 h-6" icon={faExclamationTriangle} />
      ),
      title: "Invitación fallida",
    },
  };

  const message = messages[messageCode ?? ""];
  return (
    <>
      <Section>
        <ItemsBox size="lg">
          {invitations?.map(({ id, email, role, status, updateAt }, i) => {
            const date = updateAt as unknown as string;
            const formatDate = date.split("T")[0];
            const data = indicators[status];
            return (
              <Card
                href={`?modal=invitation&id=${id}`}
                interactive
                title={data?.title}
                className="w-full flex justify-between items-start gap-lg"
                key={`invitation-${id}`}
              >
                <div className="flex flex-col text-ellipsis overflow-hidden whitespace-nowrap">
                  <span className="text-xl font-medium">{email}</span>
                  <div className="flex gap-2 text-xs font-light items-center">
                    <span className=" border border-border p-0.5 rounded-sm ">
                      {role}
                    </span>
                    <span>{formatDate}</span>
                  </div>
                </div>
                {data?.icon}
              </Card>
            );
          })}
        </ItemsBox>
      </Section>
      {message && (
        <SearchModal
          id="invitation"
          searchParams={searchParams}
          title={invitation?.email ?? ""}
        >
          <p>{message}.</p>
        </SearchModal>
      )}
    </>
  );
};
