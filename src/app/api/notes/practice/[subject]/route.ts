import { auth } from "@clerk/nextjs";
import { Privacity, Types } from "@prisma/client";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { getDefaultPractice } from "src/app/documents/edit/practice/utils/getPractice";
import generateRandomId from "src/app/subjects/utils/generateRandomId";
import prisma from "src/app/utils/prisma";
import { IdLenght } from "src/models/document.model";

export async function GET(
  request: NextRequest,
  { params: { subject } }: { params: { subject: string } }
) {
  const data = await prisma.note.findFirst({
    where: {
      type: {
        equals: Types.PRACTICE,
      },
      subjectId: Number(subject),
    },
    include: {
      File: true,
    },
  });
  return NextResponse.json({ data }, { status: 200 });
}

export async function POST(
  request: NextRequest,
  { params: { subject } }: { params: { subject: string } }
) {
  const { userId } = auth();
  if (!userId) throw new Error("Failed to fetch data");
  const newId = generateRandomId(IdLenght.lg);
  const data = await prisma.note.create({
    data: {
      subjectId: Number(subject),
      type: Types.PRACTICE,
      File: {
        create: {
          content: JSON.stringify(getDefaultPractice(newId).file.content),
          Author: {
            connect: {
              externalId: userId,
            },
          },
          externalId: newId,
          name: "Práctica",
        },
      },
    }
  });
  if(data.subjectId){
    revalidateTag(`practice/${data.subjectId}`)
  }
  return NextResponse.json({ data }, { status: 200 });
}
