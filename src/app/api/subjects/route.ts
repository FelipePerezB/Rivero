import { NextResponse } from "next/server";
import prisma from "src/app/utils/prisma";
import { auth } from "@clerk/nextjs";
import { Prisma } from "@prisma/client";

export async function GET(request: Request) {
  const subjects = await prisma.subject.findMany({
    include: {
      Topics: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  
  return NextResponse.json(
    { subjects },
    {
      status: 200,
    }
  );
}
