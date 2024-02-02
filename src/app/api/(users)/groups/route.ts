import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import prisma from "src/utils/prisma";
import organizationProtect from "../../utils/organizationProtect";

export async function POST(request: Request) {
  const res = await request.json();
  const { name, organizationId } = res;
  const resolve = organizationProtect(organizationId);
  if (!resolve) return NextResponse.json({ data: {} }, { status: 403 });
  const data = await prisma.group.create({
    data: { name, organizationId: Number(organizationId) },
  });
  if (data?.organizationId) {
    revalidateTag(`groups/${organizationId}`);
  }
  return NextResponse.json({ data }, { status: 200 });
}
