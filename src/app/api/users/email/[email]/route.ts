import { auth, clerkClient } from "@clerk/nextjs";
import { User } from "@prisma/client";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import prisma from "src/app/utils/prisma";

export async function PATCH(
  request: Request,
  { params: { email } }: { params: { email: string } }
) {
  const { userId } = auth();
  const res = (await request.json()) as Partial<User>;
  const { name, lastname } = res ?? {};
  const user = await prisma.user.findFirst({
    where: { email },
    include: { Group: true },
  });
  if (!user?.externalId)
    return NextResponse.json({ message: "User not found" }, { status: 400 });

  const data = await clerkClient.users.updateUser(user.externalId, {
    lastName: lastname,
    firstName: name,
  });
  return NextResponse.json({ data }, { status: 200 });
}
