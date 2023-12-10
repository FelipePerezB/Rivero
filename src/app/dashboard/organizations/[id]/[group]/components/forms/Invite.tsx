"use client";
import Button from "@components/common/buttons/button/button";
import StandardInput from "@components/form/StandardInput/StandardInput";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Role } from "@prisma/client";
import React, { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import toast from "react-hot-toast";
import inviteUser from "src/app/dashboard/organizations/actions/invite-user";
import Loading from "../../loading";


const SendBtn = () => {
  const { pending, data } = useFormStatus();
  console.log(pending, data);
  return (
    <Button type="submit" className={pending ? "bg-blue-400 scale-95" : ""}>
      Enviar
      {!pending ? (
        <FontAwesomeIcon className="h-3 w-3" icon={faPaperPlane} />
      ) : (
        <Loading />
      )}
    </Button>
  );
};

export default function InviteForm({
  organization,
  role,
  group,
}: {
  organization: number;
  role: Role;
  group: number;
}) {
  const updateUserWithId = inviteUser.bind(null, {
    organization,
    role,
    group,
  });
  const [state, formAction] = useFormState(updateUserWithId, {});
  return (
    <>
      <form action={formAction} className="flex flex-col gap-2">
        <StandardInput
          name="emails"
          attrs={{ placeholder: "juan@gmail.com, manuel@gmail.com..." }}
        />
        <SendBtn />
      </form>
      {JSON.stringify(state).length > 2 && (
        <>
          <hr />
          <section>
            <h2 className="mb-1">Errores</h2>
            <div className="flex flex-wrap gap-2">
              {Object.entries(state)?.map(([email, msg], i) => {
                return (
                  <div className="card w-max" key={`${email}-error-${i}`}>
                    <div className="text-slate-800">{email}</div>
                    <div className="text-xs text-red-400">{msg as string}</div>
                  </div>
                );
              })}
            </div>
          </section>
        </>
      )}
    </>
  );
}
