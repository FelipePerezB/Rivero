import { NextRequest, NextResponse } from "next/server";
import prisma from "src/utils/prisma";
import findManyScores from "../../services/findManyScores";

export async function GET(
  request: NextRequest,
  { params: { evaluation } }: { params: { evaluation: string } }
) {
  const { searchParams } = request.nextUrl;
  const group = searchParams.get("group") ?? undefined;
  const data = await findManyScores({ group, evaluation });
  // console.log(group);
  // const groupQuery = group
  //   ? {
  //       User: { groupId: Number(group) },
  //     }
  //   : {};

  // // const data = {}
  // const data = await prisma.score.findMany({
  //   where: {
  //     // User: {groupId: Number(group)}
  //     ...groupQuery,
  //     lesson: {
  //       File: {
  //         externalId: evaluation,
  //       },
  //     },
  //   },
  // });
  return NextResponse.json({ data }, { status: 200 });
}
