import type { IncomingHttpHeaders } from "http";
import type { NextApiRequest, NextApiResponse } from "next";
import type { WebhookRequiredHeaders } from "svix";
import type { WebhookEvent } from "@clerk/nextjs/server";
import { Webhook } from "svix";
import { client } from "src/service/client";
import {
  CreateUserDocument,
  RemoveUserDocument,
  Role,
  UpdateUserDocument,
} from "src/gql/graphql";

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

  if (eventType === "user.created" || eventType === "user.updated") {
    const {
      id,
      username,
      email_addresses,
      public_metadata: { gradeId, schoolId, role },
    } = evt.data;
    if (!id) {
      res.status(400).json({});
      return;
    }
    if (
      !id ||
      !username ||
      !email_addresses[0]?.email_address ||
      typeof gradeId !== "number" ||
      typeof schoolId !== "number" ||
      !role
    ) {
      res.status(400).json({});
      return;
    }

    const body = {
      email: email_addresses[0].email_address as string,
      username,
      externalId: id,
      Grade: {
        connect: {
          id: gradeId as number,
        },
      },
      role: role as Role,
      School: {
        connect: {
          id: schoolId as number,
        },
      },
    };

    if (eventType === "user.created") {
      const { data, errors } = await client.mutate({
        mutation: CreateUserDocument,
        variables: {
          createUserInput: body,
        },
      });
    } else if (eventType === "user.updated") {
      const { data, errors } = await client.mutate({
        mutation: UpdateUserDocument,
        variables: {
          updateUserInput: {
            username: {
              set: username,
            },
            Grade: body.Grade,
            School: body.School,
            role: {
              set: body.role,
            },
            email: {
              set: body.email,
            },
          },
          where: {
            externalId: id,
          },
        },
      });
      if (errors || !data) {
        res.status(400).json(errors);
        return;
      }
      res.status(201).json({ data });
      return
    }
  } else if (eventType === "user.deleted") {
    const { id } = evt.data;
    if (!id) {
      res.status(400).json({});
      return;
    }
    const { data, errors } = await client.mutate({
      mutation: RemoveUserDocument,
      variables: {
        where: {
          externalId: id,
        },
      },
    });

    if (!data || errors) {
      res.status(400).json({});
      return;
    }
    res.status(201).json({ data });
    return;
  }
}

type NextApiRequestWithSvixRequiredHeaders = NextApiRequest & {
  headers: IncomingHttpHeaders & WebhookRequiredHeaders;
};
