import { NextResponse } from "next/server";
import prisma from "src/utils/prisma";

export async function GET(
  request: Request,
  { params: { email } }: { params: { [key: string]: string } }
) {
  const data = await prisma.invitation.findMany({
    where: { email, status: "PENDING" },
  });

  return NextResponse.json({ data }, { status: 200 });
}
