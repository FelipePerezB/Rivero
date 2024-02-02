import { NextResponse } from "next/server";
import groupProtect from "src/app/api/utils/groupProtect";
import organizationProtect from "src/app/api/utils/organizationProtect";
import prisma from "src/utils/prisma";

export async function GET(
  request: Request,
  { params: { group } }: { params: { [key: string]: string } }
) {
  const resolved = await groupProtect({ group });
  if (!resolved) return NextResponse.json({ data: {} }, { status: 403 });
  const data = await prisma.invitation.findMany({
    where: { Group: { id: Number(group) }, status: "PENDING" },
  });
  return NextResponse.json({ data }, { status: 200 });
}
