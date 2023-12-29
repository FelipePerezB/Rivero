import { clerkClient } from "@clerk/nextjs";
import { Invitation } from "@clerk/nextjs/dist/types/server";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import prisma from "src/utils/prisma";

export async function POST(request: Request) {
  const res = await request.json();
  const { role, organizationId, group, email } = res;
  if (!role || !organizationId || !group || !email) return;
  NextResponse.json({ message: "Failed to invite" }, { status: 500 });
  let invitation: Invitation;
  try {
    invitation = await clerkClient.invitations.createInvitation({
      emailAddress: email,
      redirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/sign-up`,
      publicMetadata: {
        role,
        organizationId,
        groups: [group as number],
      },
    });
  } catch (error) {
    return NextResponse.json({ message: "Failed to invite" }, { status: 400 });
  }
  let dbInvitation;
  try {
    dbInvitation = await prisma.invitation.create({
      data: {
        id: invitation?.id,
        Groups: { connect: { id: group } },
        email,
        role,
        organizationId,
      },
    });
  } catch (error) {
    clerkClient.invitations.revokeInvitation(invitation.id);
    return NextResponse.json({ message: "Failed to save" }, { status: 500 });
  }

  revalidateTag(`groups/${organizationId}`);

  return NextResponse.json({ dbInvitation }, { status: 200 });
}
export async function GET(request: Request) {
  const data = await clerkClient.invitations.getInvitationList({status: "pending"})
  //  await clerkClient.invitations.createInvitation({
  //   emailAddress: "felipe.perez3712@gmail.com",
  //   publicMetadata: {
  //     organizationId: 1,
  //     group: [3],
  //     role: "STUDENT",
  //   },
  // });
  // const res = data.map(
  //   async ({ id }) => await clerkClient.invitations.revokeInvitation(id)
  // );
  return NextResponse.json({ data }, { status: 200 });
}
