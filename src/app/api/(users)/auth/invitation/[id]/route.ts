import { NextResponse } from "next/server";
import prisma from "src/utils/prisma";

export async function DELETE(
  request: Request,
  { params: { id } }: { params: { [key: string]: string } }
) {
  const data = await prisma.invitation.delete({
    where: { id: Number(id) },
  });
  return NextResponse.json({ data }, { status: 200 });
}
