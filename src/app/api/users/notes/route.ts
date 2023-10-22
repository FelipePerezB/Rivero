import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prisma from "src/app/utils/prisma";

export async function GET(request: Request) {
  const { userId } = auth();

  if (!userId) throw new Error("Failed to fetch data");

  const data = await prisma.file.findMany({
    where: {
      Author: {
        externalId: userId,
      },
    },
  });

  return NextResponse.json(
    { data },
    {
      status: 200,
    }
  );
}
