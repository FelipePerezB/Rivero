import { currentUser } from "@clerk/nextjs";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default async function Layout({ children }: Props) {
  let user;
  try {
    user = await currentUser();
  } catch (error) {}
  if (user?.publicMetadata?.role === Role.STUDENT) {
    redirect("/");
  }
  return <>{children}</>;
}
