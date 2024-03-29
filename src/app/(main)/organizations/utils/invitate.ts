'use client'
import { Role } from "@prisma/client";
import toast from "react-hot-toast";
import api from "src/utils/api";

const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export default function sendInvitation(
  email: string,
  organization: number,
  role: string = Role.STUDENT,
  group: number,
) {
  const isValid = regexEmail.test(email);
  if (!isValid) return;
  toast.promise(
    api("auth/invitation", {
      method: "POST",
      body: JSON.stringify({
        email,
        organizationId: organization,
        group,
        role,
      }),
    }),
    {
      error: "No se logró invitar",
      loading: "Enviando invitación...",
      success: "¡Invitación enviada!",
    }
  );
}
