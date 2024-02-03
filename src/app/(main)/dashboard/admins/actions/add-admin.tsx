"use server";

import { clerkClient } from "@clerk/nextjs";
import { Role, User } from "@prisma/client";
import { revalidateTag } from "next/cache";
import { IdLenght } from "src/models/document.model";
import api from "src/utils/api";
import generateRandomId from "src/utils/generateRandomId";
import prisma from "src/utils/prisma";

export default async function addAdmin(formData: FormData) {
  const email = formData.get("email") as string | null;
  if (!email) return;
  const user = await prisma.user.findFirst({ where: { email } });
  const externalId = user?.externalId;
  if (!externalId) return;
  try {
    const user = await clerkClient.users.updateUserMetadata(externalId, {
      publicMetadata: {
        random: generateRandomId(IdLenght.sm),
        role: Role.ADMIN,
      },
    });
    if (user.id) revalidateTag("admins");
  } catch (error) {
    console.log(error);
  }
}
