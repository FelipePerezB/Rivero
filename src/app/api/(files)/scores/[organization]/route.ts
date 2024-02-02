import { NextRequest, NextResponse } from "next/server";
import getAvg from "src/utils/maths/getAvg";
import prisma from "src/utils/prisma";
import findManyScores from "../services/findManyScores";
import { auth, currentUser } from "@clerk/nextjs";
import { Role } from "@prisma/client";

export async function GET(
  request: NextRequest,
  { params: { organization } }: { params: { [key: string]: string } }
) {
  const searchParams = request.nextUrl.searchParams;
  const evaluation = searchParams.get("evaluation") ?? undefined;
  const subject = searchParams.get("subject") ?? undefined;
  const group = searchParams.get("group") ?? undefined;

  console.log(group, subject)
  const data = await findManyScores({
    organization,
    evaluation,
    group,
    subject,
  });
  console.log(data)
  return NextResponse.json({ data }, { status: 200 });
}