"use client";
import Button from "@components/common/buttons/button/button";
import StandardInput from "@components/form/StandardInput/StandardInput";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Role } from "@prisma/client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import api from "src/utils/api";
import sendInvitation from "../../../../utils/invitate";

// {
//   "email": "felipeeperez3@gmail.com",
//   "organizationId": 1,
//   "groups": [1],
//   "role": "ADMIN"
// }

const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export default function InviteForm({
  organization,
  role,
  group,
}: {
  organization: number;
  role: Role;
  group: number;
}) {
  const [emails, setEmails] = useState<string>();

  const invitate = () => {
    const emailsArray = emails?.split(",")?.map((email) => email.trim());
    emailsArray?.forEach(async (email) =>
      sendInvitation(email, organization, Role.STUDENT, group)
    );
  };
  return (
    <>
      <StandardInput
        onBlur={(emails) => setEmails(emails)}
        name="Correos"
        attrs={{ placeholder: "juan@gmail.com, manuel@gmail.com..." }}
      />
      <Button onClick={invitate}>
        Enviar <FontAwesomeIcon className="h-3 w-3" icon={faPaperPlane} />
      </Button>
    </>
  );
}
