import Button from "@components/common/buttons/button/button";
import SectionTitle from "@components/common/titles/section-title";
import SubTitle from "@components/common/titles/subtitle";
import Title from "@components/common/titles/title";
import Section from "@components/containers/section";
import SearchModal from "@components/modal/search-modal";
import Options from "@components/navigation/options/options";
import { faPaperPlane, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Group, Invitation, Organization, Role } from "@prisma/client";
import React from "react";
import api from "src/utils/api";
import InviteForm, { SendBtn } from "../../components/forms/Invite";
import RadioInput from "@components/form/radio-input";
import TextAreaInput from "@components/form/TextAreaInput/text-area-input";
import InvitationsForm from "../components/invitations-form";

interface OrganizationWithGroups extends Organization {
  Groups: Group[];
}

type StatusType = "pending" | "resolved" | "failed";

export default async function InvitationsPage({
  params: { group, id: organizationId, status },
  searchParams,
}: {
  params: { group: string; id: string; status: StatusType };
  searchParams: { [key: string]: string };
}) {
  const endpoint = `organizations/${organizationId}`;
  const { data: organization } = (await api(endpoint, {}, [endpoint])) as {
    data: OrganizationWithGroups;
  };

  const { data: invitations } = (await api(
    `auth/invitation/group/${group}`,
    {},
    [endpoint]
  )) as {
    data: Invitation[];
  };

  const groupName = organization?.Groups?.find(
    ({ id }) => id === Number(group)
  )?.name;

  console.log(invitations);
  return (
    <Section>
      <div className="flex flex-col gap-sm sm:flex-row sm:justify-between sm:items-center">
        <SectionTitle
          title={"Invitaciones"}
          subTitle={`Invitar estudiantes a ${groupName}.`}
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
        option={status}
        options={[
          { title: "Pendientes", key: "pending" },
          { title: "Aceptadas", key: "resolved" },
          { title: "Fallidas", key: "failed" },
        ]}
      />
    </Section>
  );
}
