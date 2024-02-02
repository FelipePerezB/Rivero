import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import removeAdmin from "src/app/(main)/dashboard/admins/actions/remove-admin";
import adminProtect from "src/app/api/utils/adminProtect";

export async function GET(
  request: Request,
  { params: { id } }: { params: { id: string } }
) {
  const resolved = await adminProtect();
  if (!resolved) return NextResponse.json({ data: {} }, { status: 403 });
  const data = await removeAdmin(id);
  return NextResponse.json({ data }, { status: 200 });
}
