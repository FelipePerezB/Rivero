import { WebhookEvent } from "@clerk/nextjs/dist/types/server";
import prisma from "src/utils/prisma";

export default async function deleteUser(evt: WebhookEvent) {
  const { id } = evt.data;
  if (!id) return new Response(`Missing ID`, { status: 400 });
  const data = await prisma.user.delete({ where: { externalId: id } });
  if (!data.id) return new Response(`Invalid user`, { status: 400 });
  return new Response(`deleted`, { status: 201 });
}
