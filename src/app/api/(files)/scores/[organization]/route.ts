import { NextRequest, NextResponse } from "next/server";
import findManyScores from "../services/findManyScores";

export async function GET(
  request: NextRequest,
  { params: { organization } }: { params: { [key: string]: string } }
) {
  const searchParams = request.nextUrl.searchParams;
  const evaluation = searchParams.get("evaluation") ?? undefined;
  const user = searchParams.get("user") ?? undefined;
  const subject = searchParams.get("subject") ?? undefined;
  const group = searchParams.get("group") ?? undefined;
  const data = await findManyScores({
    user,
    organization,
    evaluation,
    group,
    subject,
  });
  return NextResponse.json({ data }, { status: 200 });
}