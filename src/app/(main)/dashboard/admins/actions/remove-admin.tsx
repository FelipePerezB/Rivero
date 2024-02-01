import { clerkClient } from "@clerk/nextjs";
import { Role } from "@prisma/client";
import { revalidateTag } from "next/cache";
import { IdLenght } from "src/models/document.model";
import generateRandomId from "src/utils/generateRandomId";

export default async function removeAdmin(id: string) {
  if (!id) return;
  const user = await clerkClient.users.updateUserMetadata(id, {
    publicMetadata: {
      random: generateRandomId(IdLenght.sm),
      role: Role.STUDENT,
    },
  });
  if (user.id) revalidateTag("admins");
  return user
}