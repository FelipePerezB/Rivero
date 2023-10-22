import { NextResponse } from "next/server";
import prisma from "src/app/utils/prisma";

export async function GET(
  request: Request,
  { params: { evaluation } }: { params: { evaluation: string } }
) {
  const data = await prisma.score.findMany({
    where: {
      Note: {
        File: {
          externalId: evaluation,
        },
      },
    },
  });
  return NextResponse.json({ data }, { status: 200 });
}


