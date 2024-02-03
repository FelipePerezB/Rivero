"use server";

import { clerkClient } from "@clerk/nextjs";
import { Group, Messages, Role, Status, User } from "@prisma/client";
import { revalidateTag } from "next/cache";
import getStatus from "src/utils/auth/invitations/indicators";
import sendInvitation from "src/utils/auth/invitations/sendInvitation";
import removeDuplicates from "src/utils/format/removeDuplicates";
import prisma from "src/utils/prisma";
import validateEmail from "src/utils/validation/email";

type InvitationMetadata = {
  role: Role;
  organizationId: number;
  group: number;
};

const createInvitation = async ({
  status,
  msg,
  email,
  metadata: { group, organizationId, role },
}: {
  msg: Messages;
  status: Status;
  email: string;
  metadata: InvitationMetadata;
}) =>
  await prisma.invitation.create({
    data: {
      status,
      email,
      role,
      organizationId,
      msg,
      groupId: Number(group),
    },
  });

export const sendInvitations = async (
  {
    group,
    organization,
  }: {
    organization: number;
    group?: number;
  },

  formData: FormData
) => {
  const emailsStr = formData.get("emails") as string | null;
  const emails = emailsStr?.split(",");
  emails?.forEach(async (unformatEmail) => {
    const email = unformatEmail.trim().toLowerCase();
    const role = formData.get("role") as Role;
    const newMetadata = {
      role,
      organizationId: organization,
      group: Number(group),
    };

    const customInvitation = (msg: Messages) =>
      createInvitation({
        email,
        metadata: newMetadata,
        msg,
        status: getStatus(msg),
      });

    if (!validateEmail(email))
      return await customInvitation(Messages.INVALID_EMAIL);
    let invitation;
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
          if (!user) return customInvitation(Messages.INVALID_EMAIL);
          let updatedUser;
          // Si no tiene organización se añade
          if (!user.organizationId) {
            updatedUser = await clerkClient.users.updateUserMetadata(
              user.externalId,
              { publicMetadata: newMetadata }
            );
            if (updatedUser?.id) customInvitation(Messages.RESOLVED);
            // Si ya es miembro de la organización se añade al grupo
          } else if (user.organizationId === organization) {
            updatedUser = await clerkClient.users.updateUserMetadata(
              user.externalId,
              {
                publicMetadata: {
                  ...newMetadata,
                  group,
                },
              }
            );
            if (updatedUser?.id) customInvitation(Messages.CHANGED_GROUP);
            revalidateTag(`groups/${organization}`);
            revalidateTag(`organizations/${organization}`);
            // Si no es miembro de la organización se espera a que la abandone
          } else if (user.organizationId !== organization) {
            return customInvitation(Messages.CONFIRMATION_REQUIRED).then(
              async ({ email }) => {
                const user = await prisma.user.findFirst({ where: { email } });
                revalidateTag(`invitations/group/${user?.groupId}`);
              }
            );
          }
          if (!updatedUser?.id) return customInvitation(Messages.INVALID_EMAIL);
          break;

        case "duplicate_record":
          customInvitation(Messages.DUPLICATED_RECORD);
          break;
      }
    }
  });
  revalidateTag(`invitations/group/${group}`);
};
