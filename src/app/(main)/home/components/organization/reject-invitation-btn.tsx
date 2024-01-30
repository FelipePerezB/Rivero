"use client";
import Alert from "@components/common/alert/alert";
import Button from "@components/common/buttons/button/button";
import { faCheck, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Messages, Status } from "@prisma/client";
import React from "react";
import toast from "react-hot-toast";
import api from "src/utils/api";
import prisma from "src/utils/prisma";

export default function RejectInvitationBtn({ id }: { id: number }) {
  const rejectInvitation = () => {
    toast.promise(
      api(`auth/invitation/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          status: Status.REJECTED,
          msg: Messages.REJECTED,
        }),
      }),
      {
        error: "No se logró rechazar",
        loading: "Rechazando...",
        success: "¡Rechazada correctamente!",
      }
    );
  };
  const rejectAlert = () => {
    toast((t) => (
      <Alert
        callback={rejectInvitation}
        t={t}
        message="¿Seguro que quieres rechazar la invitación?"
        color="red"
        name="Rechazar"
      />
    ));
  };
  return (
    <Button onClick={rejectAlert} size="square" color="red">
      <FontAwesomeIcon icon={faClose} className="h-3 w-3" />
    </Button>
  );
}
