"use server";

import { clerkClient } from "@clerk/nextjs";
import { Role, User } from "@prisma/client";
import { revalidateTag } from "next/cache";
import api from "src/utils/api";

export default async function addAdmin(formData: FormData) {
  const email = formData.get("email");
  console.log(process.env.NODE_ENV)
  const { data: {externalId} } = (await api(`users/email/${email}`)) as {
    data: User;
  };
  console.log(externalId)
  if (!externalId) return;
  try {
    const user = await clerkClient.users.updateUserMetadata(externalId, {
      publicMetadata: {
        a:"B",
        role: Role.ADMIN,
      },
    });
    console.log(user.publicMetadata);
    console.log(user);
    if (user.id) revalidateTag("admins");
  } catch (error) {
    console.log(error);
  }
}
