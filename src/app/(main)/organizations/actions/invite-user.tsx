"use server";
import { clerkClient } from "@clerk/nextjs";
import { Group, Role, User } from "@prisma/client";
import { Invitation } from "@clerk/nextjs/dist/types/server";
import api from "src/utils/api";
import { revalidateTag } from "next/cache";
import validateEmail from "src/utils/validation/email";
import prisma from "src/utils/prisma";

interface UserWithGroup extends User {
  Group: Group[];
}
function removeDuplicates<T>(array: T[]): T[] {
  // Use a Set to store unique values
  const uniqueSet = new Set(array);

  // Convert the Set back to an array
  const arrayWithoutDuplicates: T[] = Array.from(uniqueSet);

  return arrayWithoutDuplicates;
}

export default async function inviteUser(
  metadata: {
    organization?: number;
    group?: number;
  },
  prevState: any,
  formData: FormData
) {
  const emails = formData?.get("emails") as string;
  const role = formData?.get("role") as Role;
  // console.log(emails, metadata, rol)
  let errors: { [email: string]: string } = {};
  const emailsArray = emails?.split(",")?.map((email) => email.trim());
  const { organizationId, group } = {
    group: metadata?.group,
    organizationId: metadata?.organization,
  };

  async function processEmail(email: string) {
    if (!role || !email) return;
    if (!validateEmail(email)) {
      errors[email] = "Correo inválido";
      return;
    }
    let invitation: Invitation;

    const newMetadata = {
      role,
      organizationId,
      groups: [group as number],
    };

    try {
      invitation = await clerkClient.invitations.createInvitation({
        emailAddress: email,
        redirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/sign-up`,
        publicMetadata: newMetadata,
      });
    } catch (error: any) {
      const errorCode = error.errors[0].code;
      switch (errorCode) {
        case "form_identifier_exists":
          if (!email) return;
          const user = await prisma.user.findFirst({
            where: { email },
            include: { Group: true },
          });
          if(!user?.id) return;
          let newUser;
          if (!user.organizationId) {
            newUser = await clerkClient.users.updateUserMetadata(
              user.externalId,
              { publicMetadata: newMetadata }
            );
          // } else if (user.organizationId === organizationId) {
          //   newUser = await clerkClient.users.updateUserMetadata(
          //     user.externalId,
          //     {
          //       publicMetadata: {
          //         ...newMetadata,
          //         group: removeDuplicates([
          //           ...user?.Group.map(({ id }) => id),
          //           ...newMetadata.groups,
          //         ]),
          //       },
          //     }
          //   );
          } else if (user.organizationId !== organizationId) {
            errors = {
              ...errors,
              ...{ [email]: "El usuario ya está en otra organización" },
            };
          }
          if (!newUser?.id) {
            errors = { ...errors, ...{ [email]: "Error al añadir" } };
          }
          break;
        case "duplicate_record":
          errors = { ...errors, ...{ [email]: "Invitación dúplicada" } };
          break;
      }
    }
  }
  await Promise.all(emailsArray?.map(processEmail));

  revalidateTag(`groups/${group}`);
  return errors;
}
