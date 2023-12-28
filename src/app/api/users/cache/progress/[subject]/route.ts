import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import { STORAGE_KEY } from "src/app/constants/storage";

export async function GET(
  req: Request,
  { params: { subject } }: { params: { [key: string]: string } }
) {
  const data = await kv.get<string>(STORAGE_KEY(subject));
   
  return NextResponse.json({ data }, { status: 200 });
}
export async function POST(
  req: Request,
  { params: { subject } }: { params: { [key: string]: string } }
) {
  const res = (await req.json()) as { content: string };
  console.log(STORAGE_KEY(subject));
  if (!res?.content)
    return NextResponse.json({ msg: "missing content" }, { status: 400 });
  const data = await kv.set(STORAGE_KEY(subject), res?.content);
  return NextResponse.json({ data }, { status: 200 });
}
