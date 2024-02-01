import { NextResponse } from "next/server";
import getAvg from "src/utils/maths/getAvg";
import prisma from "src/utils/prisma";
import findManyScores from "../../../services/findManyScores";

export async function GET(
  request: Request,
  { params: { organization, subject } }: { params: { [key: string]: string } }
) {
  const data = await findManyScores({ organization, subject });
  return NextResponse.json({ data }, { status: 200 });
}
