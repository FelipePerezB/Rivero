import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const data = await currentUser();
  return NextResponse.json({ data }, { status: 200 });
}
