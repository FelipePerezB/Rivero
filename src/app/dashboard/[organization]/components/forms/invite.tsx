"use client";
import Button from "@components/Button";
import StandardInput from "@components/inputs/StandardInput/StandardInput";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Role } from "@prisma/client";
import React, { useState } from "react";
import api from "src/app/utils/api";

// {
//   "email": "felipeeperez3@gmail.com",
//   "organizationId": 1,
//   "groups": [1],
//   "role": "ADMIN"
// }

const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const invitate = ({
  emails,
  organization,
  groups,
  role,
}: {
  emails: string;
  organization: string;
  groups: string;
  role: Role
}) => {
  const emailsArray = emails.split(",")?.map((email) => email.trim());
  emailsArray.forEach(async (email) => {
    const isValid = regexEmail.test(email);
    if (!isValid) return;
    api("auth/invitate", {
      method: "POST",
      body: JSON.stringify({
        email,
        organizationId: organization,
        groups: groups.split(",").map((id) => id.trim()),
        role,
      }),
    });
  });
};

export default function InviteForm({
  organization,
  role,
  groups,
}: {
  organization: number;
  role: Role;
  groups: number[];
}) {
  const [emails, setEmails] = useState<string>();
  return (
    <>
      <StandardInput
        onBlur={(emails) => setEmails(emails)}
        name="Correos"
        attrs={{ placeholder: "juan@gmail.com, manuel@gmail.com..." }}
      />
      <Button
        onClick={() => {
          console.log(emails, organization, role, groups);
        }}
      >
        Enviar <FontAwesomeIcon className="h-3 w-3" icon={faPaperPlane} />
      </Button>
    </>
  );
}
