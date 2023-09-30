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
  UserCreateInput,
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
      last_name,
      first_name,
      email_addresses,
      public_metadata: { groups, organizationId, role },
    } = evt.data;
    if (!id) {
      res.status(400).json({});
      return;
    }
    const userGroups = groups as number[];
    if (
      !id ||
      !last_name ||
      !first_name ||
      !email_addresses[0]?.email_address ||
      !groups ||
      !organizationId ||
      !role
    ) {
      res.status(400).json({});
      return;
    }

    const body = {
      lastname: last_name,
      name: first_name,
      Organization: {
        connect: {
          id: Number(organizationId),
        },
      },
      email: email_addresses[0].email_address,
      externalId: id,
      Group: {
        connect: userGroups.map((id) => ({
          id,
        })),
      },
      role: role as Role,
    } as UserCreateInput;
    console.log(body);
    if (eventType === "user.created") {
      const { data, errors } = await client.mutate({
        mutation: CreateUserDocument,
        variables: {
          createUserInput: body,
        },
      });
      console.log(data, errors);
      if (errors || !data) {
        res.status(400).json(errors);
        return;
      }
      res.status(201).json({ data });
      return;
    } else if (eventType === "user.updated") {
      const { data, errors } = await client.mutate({
        mutation: UpdateUserDocument,
        variables: {
          updateUserInput: {
            lastname: {
              set: last_name,
            },
            Group: body.Group,
            Organization: body.Organization,
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
      return;
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
