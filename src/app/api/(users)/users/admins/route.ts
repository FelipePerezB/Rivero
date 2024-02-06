import { auth } from "@clerk/nextjs";
import { Role } from "@prisma/client";
import { NextResponse } from "next/server";
import adminProtect from "src/app/api/utils/adminProtect";
import prisma from "src/utils/prisma";

export async function GET(request: Request) {
  const resolved = adminProtect();
  if (!resolved) return NextResponse.json({ data: [] }, { status: 401 });
  const data = await prisma.user.findMany({
    where: {
      role: Role.ADMIN,
    },
  });

  return NextResponse.json(
    { data },
    {
      status: 200,
    }
  );
}
