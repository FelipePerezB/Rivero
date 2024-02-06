import { NextResponse } from "next/server";
import prisma from "src/utils/prisma";
import adminProtect from "../../utils/adminProtect";

export async function GET(req: Request) {
  const resolved = adminProtect();
  if (!resolved) return NextResponse.json({ data: [] }, { status: 403 });
  const data = await prisma.user.findMany();
  return NextResponse.json({ data }, { status: 200 });
}
