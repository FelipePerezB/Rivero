import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";
import { PRACTICE_STORAGE_KEY } from "src/app/constants/storage";

export async function POST(
  req: Request,
  { params: { subject } }: { params: { [key: string]: string } }
) {
  const res = (await req.json()) as { content: {[key: string]: unknown, time?: string} }
  console.log(res);
  if (!res?.content || typeof res.content !== "object" || !res.content?.time)
    return NextResponse.json({ msg: "missing content" }, { status: 400 });

  const practiceData = (await kv.get(PRACTICE_STORAGE_KEY(subject))) ?? {};
  
  console.log(practiceData)
  const { time, ...praciceStats } = res.content ?? {};
  if(!time) return;

  console.log(practiceData);
  const newPracticeData = ({ ...practiceData, [time]: praciceStats });
  const data = await kv.set(PRACTICE_STORAGE_KEY(subject), newPracticeData);
  return NextResponse.json({ data }, { status: 200 });
}

export async function GET(
  req: Request,
  { params: { subject } }: { params: { [key: string]: string } }
) {
  const data = await kv.get<string>(PRACTICE_STORAGE_KEY(subject));
   
  return NextResponse.json({ data }, { status: 200 });
}