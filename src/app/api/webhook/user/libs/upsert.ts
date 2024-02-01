import { clerkClient } from "@clerk/nextjs";
import { WebhookEvent } from "@clerk/nextjs/dist/types/server";
import { Role } from "@prisma/client";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import prisma from "src/utils/prisma";

export default async function upsertUser(evt: WebhookEvent) {
  const eventType = evt.type;
  if (!(eventType === "user.created" || eventType === "user.updated"))
    return NextResponse.json(
      { msg: `${eventType} is an invalid event type` },
      {
        status: 400,
      }
    );

  const {
    id,
    last_name,
    first_name,
    email_addresses,
    public_metadata: { group, organizationId, role },
  } = evt.data ?? {};

  if (!id) return NextResponse.json({ msg: "Missing ID" }, { status: 400 });
  if (!first_name)
    return NextResponse.json({ msg: "Missing name" }, { status: 400 });
  if (!email_addresses[0]?.email_address)
    return NextResponse.json({ msg: "Mssing email" }, { status: 400 });

  const user = await prisma.user.upsert({
    update: {
      email: {
        set: email_addresses[0].email_address,
      },
      organizationId: {
        set: organizationId ? Number(organizationId) : null,
      },
      groupId: { set: group ? Number(group) : null },
      lastname: { set: last_name },
      name: { set: first_name },
      role: { set: (role as Role) ?? Role.STUDENT },
    },
    where: {
      externalId: id,
    },
    create: {
      groupId: group ? Number(group) : null,
      email: email_addresses[0].email_address,
      externalId: id,
      lastname: last_name,
      name: first_name,
      role: role as Role,
      organizationId: organizationId ? Number(organizationId) : null,
    },
  });

  if (!user.externalId) {
    await clerkClient.users.deleteUser(id);
    return NextResponse.json({ msg: "upsert failed" }, { status: 400 });
  }

  revalidateTag(`groups/${organizationId}`);
  return NextResponse.json({ msg: "updated" }, { status: 200 });
}
