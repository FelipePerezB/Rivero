import { clerkClient } from "@clerk/nextjs";
import { Invitation } from "@clerk/nextjs/dist/types/server";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import adminProtect from "src/app/api/utils/adminProtect";
import organizationProtect from "src/app/api/utils/organizationProtect";
import prisma from "src/utils/prisma";

export async function POST(request: Request) {
  const res = await request.json();
  const { role, organizationId, group, email, invitationId } = res ?? {};
  const resolved = await organizationProtect({organization: organizationId});
  if (!resolved) return NextResponse.json({ data: {} }, { status: 403 });
  if (!role || !organizationId || !group || !email) return;
  NextResponse.json({ message: "Failed to invite" }, { status: 500 });
  // const invitation = await prisma.invitation.create({
  //   data: {
  //     id: invitationId,
  //     msg: "",
  //     Groups: group,
  //     email,
  //     role,
  //     organizationId,
  //   },
  // });
  // clerkClient.invitations.revokeInvitation(invitation.id);
  // return NextResponse.json({ message: "Failed to save" }, { status: 500 });
  revalidateTag(`groups/${organizationId}`);
  // return NextResponse.json({ invitation }, { status: 200 });
}

export async function GET(request: Request) {
  const data = await clerkClient.invitations.getInvitationList({
    status: "pending",
  });
  return NextResponse.json({ data }, { status: 200 });
}
