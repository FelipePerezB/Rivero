import { auth, currentUser } from "@clerk/nextjs";
import { Role } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import organizationProtect from "src/app/api/utils/organizationProtect";
import prisma from "src/utils/prisma";

export async function GET(
  request: NextRequest,
  {params: {organization}}: { params:{organization: string} }
) {
  const resolve = await organizationProtect({organization});

  const data = await prisma.group.findMany({
    where: {
      organizationId: Number(organization),
    },
    orderBy: { name: "desc" },
    include: {
      Users: resolve,
    },
  });
  return NextResponse.json({ data }, { status: 200 });
}