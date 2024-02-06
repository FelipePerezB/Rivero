import { NextRequest, NextResponse } from "next/server";
import getAvg from "src/utils/maths/getAvg";
import prisma from "src/utils/prisma";
import { auth, currentUser } from "@clerk/nextjs";
import { Role } from "@prisma/client";
import findManyScores from "../../services/findManyScores";

export async function GET(
  request: NextRequest,
  { params: { organization, subject } }: { params: { [key: string]: string } }
) {
  const searchParams = request.nextUrl.searchParams;
  const evaluation = searchParams.get("evaluation") ?? undefined;
  const group = searchParams.get("group") ?? undefined;
  const data = await findManyScores({
    organization,
    evaluation,
    group,
    subject,
  });
  return NextResponse.json({ data }, { status: 200 });
}
