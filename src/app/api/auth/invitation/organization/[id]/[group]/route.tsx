import { NextResponse } from "next/server";
import prisma from "src/utils/prisma";

export async function GET(
  request: Request,
  { params: { group } }: { params: { [key: string]: string } }
) {
  console.log(group);
  const data = await prisma.invitation.findMany({
    where: { Groups: { some: { id: Number(group) } }, status: "PENDING" },
  });
  return NextResponse.json({ data }, { status: 200 });
}
