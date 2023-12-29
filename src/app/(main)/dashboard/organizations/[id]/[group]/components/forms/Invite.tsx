"use client";
import Button, { ButtonAttrs } from "@components/common/buttons/button/button";
import Loading from "@components/common/loading-spinner/loadding-spinner";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Role } from "@prisma/client";
import React from "react";
import { useFormState, useFormStatus } from "react-dom";
import inviteUser from "../../../../actions/invite-user";
import TextAreaInput from "@components/form/TextAreaInput/text-area-input";
import OptionsInput from "src/app/documents/edit/components/edit-wraper/components/inputs/options";

export const SendBtn = ({color}: {color?: ButtonAttrs['color']}) => {
  const { pending } = useFormStatus();
  return (
    <Button
      isInactive={pending}
      color={color}
      type="submit"
      className={pending ? "scale-95" : ""}
    >
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
  label = "emails",
  group,
}: {
  label?: string;
  organization?: number;
  role?: Role;
  group?: number;
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
        {!role && (
          <OptionsInput
            dataKey="role"
            name={"Rol de las invitaciones"}
            options={[Role.STUDENT, Role.TEACHER]}
          />
        )}
        <TextAreaInput
          name={"emails"}
          attrs={{ placeholder: "juan@gmail.com, manuel@gmail.com..." }}
        />
        <div className="flex h-max items-center gap-3">
          <SendBtn color="white" />
        </div>
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
