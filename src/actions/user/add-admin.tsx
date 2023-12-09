"use server";

import { clerkClient } from "@clerk/nextjs";
import { Role } from "@prisma/client";
import { revalidateTag } from "next/cache";

export default async function removeAdmin(id: string) {
  if (!id) return;
  clerkClient.users.updateUserMetadata(id, {
    publicMetadata: {
      role: Role.STUDENT,
    },
  });
  revalidateTag("admins")
}
