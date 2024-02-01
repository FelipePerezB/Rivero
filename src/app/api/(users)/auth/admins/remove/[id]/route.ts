import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import removeAdmin from "src/app/(main)/dashboard/admins/actions/remove-admin";

export async function GET(
  request: Request,
  { params: { id } }: { params: { id: string } }
) {
  const data = await removeAdmin(id);
  return NextResponse.json({ data }, { status: 200 });
}
