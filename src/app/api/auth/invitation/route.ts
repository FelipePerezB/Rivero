import { auth } from "@clerk/nextjs";
import { Privacity, Types } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import generateRandomId from "src/app/documents/utils/generateRandomId";
import prisma from "src/app/utils/prisma";
import { IdLenght } from "src/models/document.model";

export async function POST(request: Request) {
  const res = await request.json();
  const { getToken } = auth();
  const token = await getToken();
  // if (!userId) throw new Error("Failed to fetch data");
  const { role, organizationId, groups, email } = res;

  const data = await fetch("https://api.clerk.com/v1/invitations", {
    body: JSON.stringify({
      email_address: email,
      orgRole: role,
      redirect_url: "https://rivero.vercel.app/sign-up",
      public_metadata: {
        role,
        organizationId,
        groups,
      },
    }),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return NextResponse.json({ data }, { status: 200 });
}
