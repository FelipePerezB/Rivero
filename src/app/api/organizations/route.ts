import { clerkClient } from "@clerk/nextjs";
import { Role } from "@prisma/client";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import prisma from "src/app/utils/prisma";

export async function GET(request: Request) {
  const data = await prisma.organization.findMany({
    include: {
      _count: {
        select: {
          Users: true,
        },
      },
    },
  });

  return NextResponse.json({ data }, { status: 200 });
}

export async function POST(request: Request) {
  const { email, name } = await request.json();
  const organization = await prisma.organization.create({ data: { name } });
  if (!organization?.id)
    return NextResponse.json({ organization }, { status: 400 });

  const invitation = await clerkClient.invitations.createInvitation({
    emailAddress: email,
    redirectUrl: "https://https://rivero.vercel.app/sign-up",
    publicMetadata: {
      role: Role.ADMIN,
      organizationId: organization.id,
      groups: [],
    },
  });

  revalidateTag(`groups/${organization.id}`);

  return NextResponse.json({ organization, invitation }, { status: 200 });
}
