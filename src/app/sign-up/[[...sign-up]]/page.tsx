import { SignUp, clerkClient } from "@clerk/nextjs";
import jwt from "jsonwebtoken";
import api from "src/app/utils/api";

export default async function Page({
  searchParams: { __clerk_ticket },
}: {
  searchParams: { [key: string]: string };
}) {
  console.log(__clerk_ticket);
  let decodedToken;
  try {
    decodedToken = JSON.parse(
      Buffer.from(__clerk_ticket.split(".")[1], "base64").toString()
    );
    const { ok } = await api(
      `auth/invitation/verify/${decodedToken?.sid ?? ""}`,
      { cache: "no-store" }
    );
    if (ok) return <div className="flex justify-center w-full">
       <SignUp/>
    </div>;
  } catch (error) {
    return <p>Invitación invalida</p>;
  }
  // return ok ? <SignUp /> : <p>Invitación invalida</p>;
}
