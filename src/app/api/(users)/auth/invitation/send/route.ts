import { clerkClient } from "@clerk/nextjs";
import { Invitation } from "@clerk/nextjs/dist/types/server";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const res = await request.json();
  const { role, organizationId, group, email } = res;
  if (!role || !organizationId || !group || !email) return;
  NextResponse.json({ message: "Failed to invite" }, { status: 500 });
  const invitation = await clerkClient.invitations.createInvitation({
    emailAddress: email,
    redirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/sign-up`,
    publicMetadata: {
      role,
      organizationId,
      groups: [group as number],
    },
  });
  try {
  } catch (error) {
    return NextResponse.json({ message: "Failed to invite" }, { status: 400 });
  }

  revalidateTag(`groups/${organizationId}`);

  return NextResponse.json({ invitation }, { status: 200 });
}
