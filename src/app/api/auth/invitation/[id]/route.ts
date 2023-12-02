import { NextResponse } from "next/server";
import prisma from "src/utils/prisma";

export async function DELETE(
  request: Request,
  { params: { id } }: { params: { [key: string]: string } }
) {
  console.log(id)
  const data = await prisma.invitation.delete({
    where: { id },
  });
  return NextResponse.json({ data }, { status: 200 });
}
