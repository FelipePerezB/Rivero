import { WebhookEvent } from "@clerk/nextjs/dist/types/server";
import { Role } from "@prisma/client";
import { revalidateTag } from "next/cache";
import prisma from "src/utils/prisma";

export default async function upsertUser(evt: WebhookEvent) {
  const eventType = evt.type;
  if (!(eventType === "user.created" || eventType === "user.updated"))
    return new Response(`${eventType} is an invalid event type`, {
      status: 400,
    });

  const {
    id,
    last_name,
    first_name,
    email_addresses,
    public_metadata: { groups, organizationId, role },
  } = evt.data ?? {};
  const userGroups = (groups as number[]) || undefined;

  if (!id) return new Response("Missing ID", { status: 400 });
  if (!first_name) return new Response("Missing name", { status: 400 });
  if (!email_addresses[0]?.email_address)
    return new Response("Mssing email", { status: 400 });

  const Group = userGroups?.length
    ? {
        connect: userGroups?.map((id) => ({
          id,
        })),
      }
    : undefined;

  await prisma.user.upsert({
    update: {
      email: {
        set: email_addresses[0].email_address,
      },
      Group,
      lastname: { set: last_name },
      name: { set: first_name },
      role: { set: (role as Role) ?? Role.STUDENT },
      organizationId: organizationId
        ? { set: Number(organizationId) }
        : undefined,
    },
    where: {
      externalId: id,
    },
    create: {
      Group,
      email: email_addresses[0].email_address,
      externalId: id,
      lastname: last_name,
      name: first_name,
      role: role as Role,
      organizationId: organizationId ? Number(organizationId) : undefined,
    },
  });

  revalidateTag(`groups/${organizationId}`);
  return new Response("updated", { status: 200 });
}
