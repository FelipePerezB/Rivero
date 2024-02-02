import { auth, clerkClient } from "@clerk/nextjs";
import { Invitation, Messages, Status } from "@prisma/client";
import { NextResponse } from "next/server";
import organizationProtect from "src/app/api/utils/organizationProtect";
import prisma from "src/utils/prisma";

export async function PATCH(request: Request) {
  const { id, organizationId } = (await request.json()) as Partial<Invitation>;
  const resolved = await organizationProtect({organization: organizationId});
  if (!resolved) return NextResponse.json({ data: {} }, { status: 403 });

  const { userId } = auth();
  if (!userId)
    return NextResponse.json({ message: "user not found" }, { status: 400 });
  const newUser = await clerkClient.users.updateUserMetadata(userId, {
    publicMetadata: { organizationId },
  });

  if (!newUser?.id)
    return NextResponse.json(
      { message: "non-assignable organization" },
      { status: 400 }
    );

    
    const data = await prisma.invitation.update({
      where: { id },
      data: { status: Status.RESOLVED, msg: Messages.RESOLVED },
    });
    console.log(id, data);

  return NextResponse.json({ data }, { status: 200 });
}
