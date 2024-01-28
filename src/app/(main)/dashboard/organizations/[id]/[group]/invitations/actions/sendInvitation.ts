"use server";

import { clerkClient } from "@clerk/nextjs";
import { Group, Role, User } from "@prisma/client";
import sendInvitation from "src/utils/auth/sendInvitation";
import removeDuplicates from "src/utils/format/removeDuplicates";
import prisma from "src/utils/prisma";
import validateEmail from "src/utils/validation/email";

const createInvitation = async () =>{
  // const invitation = await prisma.invitation.create({data: {email:""}})

}



export const sendInvitations = async (
  {
    group,
    organization,
  }: {
    organization?: number;
    group?: number;
  },

  formData: FormData
) => {
  const emailsStr = formData.get("emails") as string | null;
  const emails = emailsStr?.split(",");
  emails?.forEach(async (unformatEmail) => {
    const email = unformatEmail.trim().toLowerCase();
    console.log(email);
    if (!validateEmail(email)) return console.log("Email invalido");
    const role = formData.get("role") as Role;
    let invitation;
    const newMetadata = {
      role,
      organizationId: organization,
      groups: [group as number],
    };
    try {
      invitation = await sendInvitation(email, newMetadata);
    } catch (error: any) {
      const errorCode = error.errors[0].code;
      switch (errorCode) {
        // El usuario ya existe
        case "form_identifier_exists":
          const user = await prisma.user.findUnique({
            where: { email },
            include: { Group: true },
          });
          if (!user) return console.log("Error al añadir");
          let updatedUser;
          // Si no tiene organización se añade
          if (!user.organizationId) {
            updatedUser = await clerkClient.users.updateUserMetadata(
              user.externalId,
              { publicMetadata: newMetadata }
            );
            // Si ya es miembro de la organización se añade al grupo
          } else if (user.organizationId === organization) {
            updatedUser = await clerkClient.users.updateUserMetadata(
              user.externalId,
              {
                publicMetadata: {
                  ...newMetadata,
                  group
                },
              }
            );
            // Si no es miembro de la organización se espera a que la abandone
          } else if (user.organizationId !== organization)
            return console.log("El usuario ya esta en otra organización");
          if (!updatedUser?.id) return console.log("Error al añadir");
          break;

        case "duplicate_record":
          console.log("El usuario ya tiene una invitación");
          break;
      }
    }
  });
};
