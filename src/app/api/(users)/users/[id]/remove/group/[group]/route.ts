import { clerkClient } from "@clerk/nextjs";
import { Role } from "@prisma/client";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import groupProtect from "src/app/api/utils/groupProtect";

export async function GET(
  request: Request,
  { params: { id, group } }: { params: { id: string; group: string } }
) {
  const resolved = groupProtect({group})
  if (!resolved) return NextResponse.json({ data: {} }, { status: 403 });
  if (!id)
    return NextResponse.json({ message: "User not found" }, { status: 400 });
  const data = await clerkClient.users.updateUserMetadata(id, {
    publicMetadata: {
      group: null,
      organizationId: null,
    },
  });
  if (data.id && group) revalidateTag(`groups/${group}`);
  return NextResponse.json({ data }, { status: 200 });
}
