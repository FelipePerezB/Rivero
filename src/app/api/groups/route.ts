import { auth, currentUser } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import prisma from "src/app/utils/prisma";

export async function GET(request: NextRequest) {
  const user = await currentUser();
  const userGroups = user?.publicMetadata?.groups as number[];

  if (!userGroups.length) throw new Error("Failed to fetch data");

  const data = await prisma.group.findMany({
    where: { id: { in: userGroups } },
    include: {
      Users: true,
    },
  });
  return NextResponse.json({ data }, { status: 200 });
}
