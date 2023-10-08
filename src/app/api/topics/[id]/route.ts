import { NextResponse } from "next/server";
import prisma from "src/app/utils/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  const data = await prisma.topic.findUnique({
    where: { id },
    include: {
      Subtopics: {
        // select: {
        //   id: true,
        //   name: true,
        // },
        include: {
          Notes: {
            include: {
              File: true,
            },
          },
        },
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
