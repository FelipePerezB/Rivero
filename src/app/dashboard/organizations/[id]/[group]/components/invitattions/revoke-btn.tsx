"use client";
import { clerkClient } from "@clerk/nextjs";
import Button from "@components/common/buttons/button/button";
import Alert from "@components/common/alert/alert";
import React from "react";
import toast from "react-hot-toast";
import api from "src/utils/api";

export default function RevokeBtn({ id }: { id: string }) {
  const  revoke = () => {
    toast((t) => (
      <Alert
        callback={() => {
          toast.promise(
            api("auth/invitation/" + id, {method: "DELETE"}),
            // clerkClient.invitations.revokeInvitation(id)
            {
              error: "No se logró eliminar la invitación",
              loading: "Eliminando invitación...",
              success: "¡invitación eliminada correctamente!",
            }
          );
        }}
        t={t}
        message="¿Eliminar invitación? El usuario puede volver a ser invitado desde el panel"
      />
    ));
  };
  return (
    <Button onClick={revoke} color="red">
      Revocar
    </Button>
  );
}
