import { NextResponse } from "next/server";
import prisma from "src/app/utils/prisma";

export async function GET(
  request: Request,
  {
    params: { group, evaluation },
  }: { params: { group: string; evaluation: string } }
) {
  const data = await prisma.score.findMany({
    where: {
      Note: {
        File: {
          externalId: evaluation,
        },
      },
      User: {
        Group: {
          some: { id: { equals: Number(group) } },
        },
      },
    },
  });
  return NextResponse.json({ data }, { status: 200 });
}
