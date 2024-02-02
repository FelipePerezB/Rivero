import { auth, clerkClient } from "@clerk/nextjs";
import { User } from "@prisma/client";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import adminProtect from "src/app/api/utils/adminProtect";
import prisma from "src/utils/prisma";

export async function GET(
  request: Request,
  { params: { email } }: { params: { email: string } }
) {
  const data = await prisma.user.findFirst({
    where: { email },
    include: { Group: true },
  });
  if (!data?.externalId)
    return NextResponse.json({ message: "User not found" }, { status: 400 });

  return NextResponse.json({ data }, { status: 200 });
}

export async function PATCH(
  request: Request,
  { params: { email } }: { params: { email: string } }
) {
  const resolved = adminProtect()
  if (!resolved) return NextResponse.json({ data: {} }, { status: 403 });
  const res = (await request.json()) as Partial<User>;
  const { name, lastname } = res ?? {};
  const user = await prisma.user.findFirst({
    where: { email },
    include: { Group: true },
  });
  if (!user?.externalId)
    return NextResponse.json({ message: "User not found" }, { status: 400 });

  const data = await clerkClient.users.updateUser(user.externalId, {
    lastName: lastname ?? undefined,
    firstName: name,
  });
  return NextResponse.json({ data }, { status: 200 });
}

export async function DELETE(
  request: Request,
  { params: { email } }: { params: { email: string } }
) {
  const resolved = adminProtect()
  if (!resolved) return NextResponse.json({ data: {} }, { status: 403 });
  const user = await prisma.user.findFirst({
    where: { email },
    include: { Group: true },
  });
  if (!user?.externalId)
    return NextResponse.json({ message: "User not found" }, { status: 400 });

  const data = await clerkClient.users.deleteUser(user.externalId);
  return NextResponse.json({ data }, { status: 200 });
}
