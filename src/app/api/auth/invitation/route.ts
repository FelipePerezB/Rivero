import { clerkClient } from "@clerk/nextjs";
import { revalidateTag } from "next/cache";
import {  NextResponse } from "next/server";

export async function POST(request: Request) {
  const res = await request.json();
  // if (!userId) throw new Error("Failed to fetch data");
  const { role, organizationId, groups, email } = res;
  const invitation = await clerkClient.invitations.createInvitation({
    emailAddress: email,
    redirectUrl: "https://https://rivero.vercel.app/sign-up",
    publicMetadata: {
      role,
      organizationId,
      groups,
    },
  });

  console.log(invitation)
  revalidateTag(`groups/${organizationId}`);

  return NextResponse.json({ invitation }, { status: 200 });
}
