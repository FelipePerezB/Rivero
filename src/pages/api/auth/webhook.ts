import type { IncomingHttpHeaders } from "http";
import type { NextApiRequest, NextApiResponse } from "next";
import type { WebhookRequiredHeaders } from "svix";
import type { WebhookEvent } from "@clerk/nextjs/server";
import { Webhook } from "svix";
import prisma from "src/utils/prisma";
import { Role, User } from "@prisma/client";
import { revalidateTag } from "next/cache";

const webhookSecret = process.env.WEBHOOK_SECRET;

export default async function Handler(
  req: NextApiRequestWithSvixRequiredHeaders,
  res: NextApiResponse
) {
  const payload = JSON.stringify(req.body);
  const headers = req.headers;
  if (!webhookSecret) return;
  // Create a new Webhook instance with your webhook secret
  const wh = new Webhook(webhookSecret);

  let evt: WebhookEvent;
  try {
    // Verify the webhook payload and headers
    evt = wh.verify(payload, headers) as WebhookEvent;
  } catch (_) {
    // If the verification fails, return a 400 error
    return res.status(400).json({message: "verification fails"});
  }
  const eventType = evt.type;

  if (eventType === "user.created" || eventType === "user.updated") {
    const {
      id,
      last_name,
      first_name,
      email_addresses,
      public_metadata: { groups, organizationId, role },
    } = evt.data;
    if (!id) {
      res.status(400).json({message: "missing user ID"});
      return;
    }
    console.log(evt.data);
    const userGroups = groups as number[];
    if (
      !id ||
      !first_name ||
      !email_addresses[0]?.email_address 
      // !groups ||
      // !organizationId ||
      // !role
    ) {
      res.status(400).json({message: "missing data"});
      return;
    }

    console.log(userGroups);

    const data = await prisma.user.upsert({
      update: {
        email: {
          set: email_addresses[0].email_address,
        },
        Group: {
          connect: userGroups.map((id) => ({
            id,
          })),
        },
        lastname: { set: last_name },
        name: { set: first_name },
        role: { set: role as Role },
        organizationId: { set: Number(organizationId) },
      },
      where: {
        externalId: id,
      },
      create: {
        Group: {
          connect: userGroups.map((id) => ({
            id,
          })),
        },
        email: email_addresses[0].email_address,
        externalId: id,
        lastname: last_name,
        name: first_name,
        role: role as Role,
        organizationId: Number(organizationId),
      },
    });

    revalidateTag(`groups/${organizationId}`);
    res.status(201).json({ data });
    return;
  } else if (eventType === "user.deleted") {
    const { id } = evt.data;
    if (!id) {
      res.status(400).json({message: "missing event id"});
      return;
    }
    const data = await prisma.user.delete({
      where: {
        externalId: id,
      },
    });

    if (!data.id) {
      res.status(400).json({message: "invalid user"});
      return;
    }
    res.status(201).json({ data });
    return;
  }
}

type NextApiRequestWithSvixRequiredHeaders = NextApiRequest & {
  headers: IncomingHttpHeaders & WebhookRequiredHeaders;
};
