import { NextResponse } from "next/server";
import getAvg from "src/utils/maths/getAvg";
import prisma from "src/utils/prisma";
import findManyScores from "../services/findManyScores";
import { auth, currentUser } from "@clerk/nextjs";
import { Role } from "@prisma/client";

export async function GET(
  request: Request,
  { params: { organization } }: { params: { [key: string]: string } }
) {

  const data = await findManyScores({ organization });
  return NextResponse.json({ data }, { status: 200 });
}
