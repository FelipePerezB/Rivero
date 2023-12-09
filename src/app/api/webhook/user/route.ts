import upsertUser from "./libs/upsert";
import deleteUser from "./libs/delete";
import verify from "../libs/svix";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  let evt = await verify(req);
  const eventType = evt.type;
  console.log(evt);
  if (eventType === "user.created" || eventType === "user.updated")
    return await upsertUser(evt);
  else if (eventType === "user.deleted") return await deleteUser(evt);

  return new Response(`${eventType} is an invalid event type`, {
    status: 400,
  });
}
