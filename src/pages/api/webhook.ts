import type { IncomingHttpHeaders } from "http";
import type { NextApiRequest, NextApiResponse } from "next";
import type { WebhookRequiredHeaders } from "svix";
import type { WebhookEvent } from "@clerk/nextjs/server";
import { Webhook } from "svix";
import { client } from "src/service/client";
import { CreateUserDocument, Role } from "src/gql/graphql";

const webhookSecret = process.env.WEBHOOK_SECRET;

export default async function handler(
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
    return res.status(400).json({});
  }

  const eventType = evt.type;
  if (eventType === "user.created") {
    const { id, username, email_addresses, public_metadata } = evt.data;
    if (
      !id ||
      !username ||
      !email_addresses[0]?.email_address ||
      !public_metadata.gradeId ||
      !public_metadata.schoolId ||
      !public_metadata.role
    )
      return;
    const { gradeId, schoolId, role } = public_metadata;
    if (!gradeId || !schoolId || !role) return;
    const { data, errors } = await client.mutate({
      mutation: CreateUserDocument,
      variables: {
        createUserInput: {
          email: email_addresses[0].email_address,
          username,
          externalId: id,
          Grade: {
            connect: {
              id: public_metadata.gradeId as number,
            },
          },
          role: role as Role,
          School: {
            connect: {
              id: schoolId as number,
            },
          },
        },
      },
    });
    console.log(data, errors);
    res.status(201).json({});
  }
}

type NextApiRequestWithSvixRequiredHeaders = NextApiRequest & {
  headers: IncomingHttpHeaders & WebhookRequiredHeaders;
};
