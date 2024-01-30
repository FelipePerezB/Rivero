"use client";
import Alert from "@components/common/alert/alert";
import Button from "@components/common/buttons/button/button";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Messages, Status } from "@prisma/client";
import React from "react";
import toast from "react-hot-toast";
import api from "src/utils/api";

export default function AcceptInvitationBtn({
  id,
  organizationId,
}: {
  id: number;
  organizationId: number;
}) {
  const acceptInvitation = () => {
    toast.promise(
      api(`auth/invitation/organization/change`, {
        method: "PATCH",
        body: JSON.stringify({ id, organizationId }),
      }),
      {
        error: "No se logró aceptar",
        loading: "Aceptando...",
        success: "¡Aceptada correctamente!",
      }
    );
  };
  const acceptAlert = () => {
    toast((t) => (
      <Alert
        callback={acceptInvitation}
        t={t}
        message="¿Seguro que quieres cambiar de organización?"
        name="Aceptar"
      />
    ));
  };
  return (
    <Button onClick={acceptAlert} size="square">
      <FontAwesomeIcon icon={faCheck} className="h-3 w-3" />
    </Button>
  );
}
