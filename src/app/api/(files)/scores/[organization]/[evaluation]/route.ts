import { NextRequest, NextResponse } from "next/server";
import prisma from "src/utils/prisma";

export async function GET(
  request: NextRequest,
  { params: { evaluation } }: { params: { evaluation: string } }
) {
  const { searchParams } = request.nextUrl;
  const group = searchParams.get("group");
  const groupQuery = group
    ? {
        User: {
          Group: {
            some: { id: { equals: Number(group) } },
          },
        },
      }
    : {};
  
    // const data = {}
    const data = await prisma.score.findMany({
      where: {
        ...groupQuery,
        lesson: {
          File: {
            externalId: evaluation,
          },
        },
      },
    });
  return NextResponse.json({ data }, { status: 200 });
}