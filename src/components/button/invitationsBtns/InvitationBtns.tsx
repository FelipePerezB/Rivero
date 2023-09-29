import Table from "@components/Table";
import CircleButton from "@components/button/circle-button/circle-button";
import Form from "@components/forms/simpleForm/SimpleForm";
import Modal from "@components/modals/modal/Modal";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { api } from "src/getDoc/utils/api";
import { Role } from "src/gql/graphql";

const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

type statusType = "Enviada" | "Fallida" | "Pendiente";
type invitationStatus = {
  [label: string]: statusType;
};

export default function InvitationBtns({
  gradeId,
  schoolId,
  role,
}: {
  gradeId: number;
  schoolId: number;
  role: Role;
}) {
  const [modalState, setModalState] = useState(false);
  const [invitations, setInvitations] = useState<invitationStatus>({});
  const invitationsArray = Object.entries(invitations).map(
    ([email, status]) => [email, status]
  );

  const invitate = ({ emails }: { emails: string }) => {
    const emailsArray = emails.split(",")?.map((email) => email.trim());
    emailsArray.forEach(async (email) => {
      const isValid = regexEmail.test(email);
      if (!isValid) return;
      let status: statusType = "Pendiente";
      Object.assign(invitations, { [email]: status });
      setInvitations({ ...invitations });
      try {
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
      <Modal {...{ modalState, setModalState, title: "Invitar usuarios" }}>
        {/* <Form
          {...{
            data: [
              {
                title: "Invitar",
                inputs: [
                  {
                    name: "Correos",
                    dataKey: "emails",
                    placeholder: "felipe@gmail.com, pedro@gmail.com...",
                  },
                ],
                buttons: [
                  {
                    children: "Invitar",
                    style: "small-active",
                    onClick: invitate,
                  },
                ],
              },
            ],
          }}
        /> */}
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
      </Modal>
    </>
  );
}
