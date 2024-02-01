import TextAreaInput from "@components/form/TextAreaInput/text-area-input";
import RadioInput from "@components/form/radio-input";
import React from "react";
import InviteForm, { SendBtn } from "../../components/forms/Invite";
import { Role } from "@prisma/client";
import inviteUser from "../../../../actions/invite-user";
import { useFormState, useFormStatus } from "react-dom";
import { sendInvitations } from "../actions/sendInvitation";

export default function InvitationsForm({
  group,
  organization,
}: {
  group: number;
  organization: number;
}) {
  const updateUserWithId = sendInvitations.bind(null,{
    organization,
    group,
  });

  return (
    <form action={updateUserWithId} className="flex flex-col gap-sm">
      <RadioInput
        label="Rol de las invitaciones"
        name="role"
        options={[Role.STUDENT, Role.TEACHER]}
      />
      <TextAreaInput
        name={"emails"}
        attrs={{ placeholder: "sofía@gmail.com, gabriel@gmail.com..." }}
      />

      <SendBtn />
    </form>
  );
}
