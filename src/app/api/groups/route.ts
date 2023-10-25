import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import prisma from "src/app/utils/prisma";

export async function POST(request: Request) {
  const res = await request.json();
  const { name, organizationId } = res;
  const data = await prisma.group.create({
    data: { name, organizationId: Number(organizationId) },
  });
  if (data?.organizationId) {
    revalidateTag(`groups/${organizationId}`);
  }
  return NextResponse.json({ data }, { status: 200 });
}