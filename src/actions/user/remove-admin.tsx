"use server";

import { clerkClient } from "@clerk/nextjs";
import { Role } from "@prisma/client";
import { revalidateTag } from "next/cache";

export default async function removeAdmin(id: string) {
  console.log(id)
  if (!id) return;
  const user = await clerkClient.users.updateUserMetadata(id, {
    publicMetadata: {
      role: Role.STUDENT,
    },
  });
  console.log(user);
  console.log(user.publicMetadata);
  if (user.id) revalidateTag("admins");
}