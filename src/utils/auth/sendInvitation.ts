import { clerkClient } from "@clerk/nextjs";
import { Role } from "@prisma/client";

export default async function sendClerkInvitation(
  email: string,
  metadata: {
    role: Role;
    organizationId?: number;
    groups: number[];
  }
) {
  const invitation = await clerkClient.invitations.createInvitation({
    emailAddress: email,
    redirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/sign-up`,
    publicMetadata: metadata,
  });
  return invitation;
}
