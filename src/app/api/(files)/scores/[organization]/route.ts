import { NextResponse } from "next/server";
import getAvg from "src/utils/maths/getAvg";
import prisma from "src/utils/prisma";
import findManyScores from "../services/findManyScores";
import { auth, currentUser } from "@clerk/nextjs";
import { Role } from "@prisma/client";

export async function GET(
  request: Request,
  { params: { organization } }: { params: { [key: string]: string } }
) {
  const user = await currentUser();
  if (!user?.id)
    return NextResponse.json(
      { message: "user not found", data: [] },
      { status: 400 }
    );
  console.log({ user });
  const role = user?.publicMetadata?.role as Role;
  const userOrganizationId = user?.publicMetadata?.organizationId;
  if (
    !role ||
    role === Role.STUDENT ||
    (userOrganizationId && Number(userOrganizationId) !== Number(organization))
  )
    return NextResponse.json(
      { data: [], message: "You don't have permission to access" },
      { status: 403 }
    );
  const data = await findManyScores({ organization });
  return NextResponse.json({ data }, { status: 200 });
}
