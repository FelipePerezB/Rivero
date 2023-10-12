'use client'
import Button from "@components/Button";
import Table from "@components/Table";
import CircleButton from "@components/button/circle-button/circle-button";
import StandardInput from "@components/inputs/StandardInput/StandardInput";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import SearchModal from "src/app/components/modal/search-modal";
import { Role } from "src/gql/graphql";

const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

type statusType = "Enviada" | "Fallida" | "Pendiente";
type invitationStatus = {
  [label: string]: statusType;
};

export default function InvitationBtns({
  groupId,
  organizationId,
  role,
}: {
  groupId: number;
  organizationId: number;
  role: Role;
}) {
  const [modalState, setModalState] = useState(false);
  const [invitations, setInvitations] = useState<invitationStatus>({});
  const [emails, setEmails] = useState("");
  const invitationsArray = Object.entries(invitations).map(
    ([email, status]) => [email, status]
  );

  const invitate = () => {
    const emailsArray = emails.split(",")?.map((email) => email.trim());
    emailsArray.forEach(async (email) => {
      const isValid = regexEmail.test(email);
      if (!isValid) return;
      let status: statusType = "Pendiente";
      Object.assign(invitations, { [email]: status });
      setInvitations({ ...invitations });
      try {
        // const data = await api("auth/sendInvitation", {
        //   method: "POST",
        //   body: JSON.stringify({
        //     email,
        //     organizationId,
        //     groups: [groupId],
        //     role,
        //   }),
        // });
        status = "Enviada";
      } catch (error) {
        status = "Fallida";
      }
      Object.assign(invitations, { [email]: status });
      setInvitations({ ...invitations });
    });
  };
  return (
    <>
      <CircleButton>
        <FontAwesomeIcon
          icon={faPlus}
          size="lg"
          onClick={() => {
            setModalState(true);
          }}
        />
      </CircleButton>
      <SearchModal id="invitation" searchParams={{}} title="Invitar">
        <StandardInput
          onChange={({ emails }) => setEmails(emails)}
          name="Correos"
          dataKey="emails"
          placeholder="felipe@gmail.com, alicia@gmail.com"
        />
        <Button onClick={invitate}>Invitar</Button>
        {!!invitationsArray.length && (
          <Table
            head={{
              keys: [
                { name: "Correo", key: "email" },
                { name: "Estado", key: "status" },
              ],
            }}
            data={invitationsArray}
          />
        )}
      </SearchModal>
    </>
  );
}