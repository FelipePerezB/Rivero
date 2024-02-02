import { clerkClient } from "@clerk/nextjs";
import { Role } from "@prisma/client";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import prisma from "src/utils/prisma";
import adminProtect from "../../utils/adminProtect";

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
  const resolved = await adminProtect();
  if (!resolved) return NextResponse.json({ data: {} }, { status: 403 });
  const { name } = await request.json();
  const organization = await prisma.organization.create({ data: { name } });
  if (!organization?.id)
    return NextResponse.json({ organization }, { status: 400 });

  revalidateTag(`groups/${organization.id}`);
  revalidateTag(`organizations`);

  return NextResponse.json({ organization }, { status: 200 });
}
