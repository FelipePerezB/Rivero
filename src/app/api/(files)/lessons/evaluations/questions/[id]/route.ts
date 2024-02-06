import { NextRequest, NextResponse } from "next/server";
import api from "src/utils/api";

export async function GET(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const { data: evaluation } = await api(`files/${id}`, {}, [`files/${id}`]);
  const content = JSON.parse(evaluation?.content ?? "{}");
  const questions: { options: { expectedAns: string,isPilot?: boolean } }[] =
    content?.options?.children ?? [];
  const answers = questions?.map(({ options: { expectedAns, isPilot } }) => ({expectedAns, isPilot}));

  const data = {
    answers,
    id: evaluation?.id,

  };

  return NextResponse.json({ data }, { status: 200 });
}
