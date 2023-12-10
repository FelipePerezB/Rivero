"use server";
import { clerkClient } from "@clerk/nextjs";
import { Group, User } from "@prisma/client";
import { revalidateTag } from "next/cache";
import api from "src/utils/api";
interface UserWithGroup extends User {
  Group: Group[];
}

export default async function removeGroup(
  metadata: {
    email: string;
    group: string;
  },
  formData: FormData
) {
  const { data: user } = (await api(`users/email/${metadata?.email}`, {
    cache: "no-store",
  })) as {
    data: UserWithGroup;
  };
  const newGroups = user.Group?.filter(
    ({ id }) => id !== Number(metadata?.group)
  ).map(({ id }) => id);
  const updatedUser = await clerkClient?.users?.updateUserMetadata(
    user?.externalId,
    {
      publicMetadata: {
        organizationId: newGroups.length ? null : user.organizationId,
        groups: newGroups,
      },
    }
  );
  if (updatedUser.id) revalidateTag(`groups/${metadata.group}`);
}
