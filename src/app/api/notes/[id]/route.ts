import { NextResponse } from "next/server";
import prisma from "src/app/utils/prisma";

export async function GET(
  request: Request,
  { params: { id } }: { params: { id: string } }
) {
  const data = await prisma.note.findMany({
    where: {
      File: {
        externalId: id,
      },
    },
    include: { File: true },
  });
  return NextResponse.json({ data }, { status: 200 });
}
