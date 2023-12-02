import { NextRequest, NextResponse } from "next/server";
import prisma from "src/utils/prisma";

export async function GET(
  request: NextRequest,
  { params: { evaluation } }: { params: { evaluation: string } }
) {
  const { searchParams } = request.nextUrl;
  const group = searchParams.get("group");
  console.log(group)
  const groupQuery = group
    ? {
        User: {
          Group: {
            some: { id: { equals: Number(group) } },
          },
        },
      }
    : {};
    const data = await prisma.score.findMany({
      where: {
        ...groupQuery,
        Note: {
          File: {
            externalId: evaluation,
          },
        },
      },
    });
    console.log(data)
  return NextResponse.json({ data }, { status: 200 });
}
