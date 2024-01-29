import { Status } from "@prisma/client";
import { NextResponse } from "next/server";
import prisma from "src/utils/prisma";

export async function GET(
  request: Request,
  { params: { group, status: statusStr } }: { params: { [key: string]: string, status: string } }
) {
  const status = statusStr.toUpperCase() as Status
  const data = await prisma.invitation.findMany({
    where: { Group: { id: Number(group) }, status },
  });
  return NextResponse.json({ data }, { status: 200 });
}
