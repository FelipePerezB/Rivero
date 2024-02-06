import { NextRequest, NextResponse } from "next/server";
import prisma from "src/utils/prisma";

export async function GET(
  request: NextRequest,
  { params: { id } }: { params: { [key: string]: string } }
) {
  const data = prisma.user.findUnique({ where: { id: Number(id) } });
  return NextResponse.json({ data }, { status: 200 });
}
