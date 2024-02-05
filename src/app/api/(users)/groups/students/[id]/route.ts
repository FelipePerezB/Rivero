import { Role } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import prisma from "src/utils/prisma";

export async function GET(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const data = await prisma.user.findMany({
    where: { groupId: Number(id), role: Role.STUDENT },
    select: { email: true, id: true, name: true, lastname: true },
  });
  return NextResponse.json({ data }, { status: 200 });
}
 