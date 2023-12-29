import { NextResponse } from "next/server";
import prisma from "src/utils/prisma";

export async function GET(req: Request) {
  const data = await prisma.user.findMany()
  return NextResponse.json({ data }, { status: 200 });
}
