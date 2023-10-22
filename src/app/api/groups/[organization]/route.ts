import { auth, currentUser } from "@clerk/nextjs";
import { Role } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import prisma from "src/app/utils/prisma";

export async function GET(
  request: NextRequest,
  {params}: { params:{organization: string} }
) {
  // const user = await currentUser();
  // const userGroups = user?.publicMetadata?.groups as number[];
  // const role = user?.publicMetadata?.role as Role;
  
  // if (!userGroups.length) throw new Error("Failed to fetch data");

  const data = await prisma.group.findMany({
    // where: role !== Role.ADMIN ? { id: { in: userGroups } } : undefined,
    where: {
      organizationId: Number(params?.organization),
    },
    orderBy: { name: "desc" },
    include: {
      Users: true,
    },
  });
  return NextResponse.json({ data }, { status: 200 });
}

export async function POST(
  request: Request,
  { params: { organization } }: { params: { organization: string } }
) {
  const res = await request.json();
  const { name } = res;
  const data = await prisma.group.create({
    data: { name, organizationId: Number(organization) },
  });
  return NextResponse.json({ data }, { status: 200 });
}
