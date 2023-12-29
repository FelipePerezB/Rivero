import { auth } from "@clerk/nextjs";
import { Role } from "@prisma/client";
import { NextResponse } from "next/server";
import prisma from "src/utils/prisma";

export async function GET(request: Request) {
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
