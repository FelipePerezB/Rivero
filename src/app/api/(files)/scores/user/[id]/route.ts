import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prisma from "src/utils/prisma";

export async function GET(
  request: Request,
  { params: { id } }: { params: { id: string } }
) {
  const { userId } = auth();
  if (userId !== id) NextResponse.json({ data: [] }, { status: 200 });
  const data = await prisma.score.findMany({
    orderBy: {
      updateAt: "asc",
    },
    where: {
      User: { externalId: id },
    },
  });

  return NextResponse.json({ data }, { status: 200 });
}
