import { currentUser } from "@clerk/nextjs";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default async function Layout({ children }: Props) {
  const user = await currentUser();
  if (!user?.publicMetadata?.role) {
    redirect("/");
  }
  return <>{children}</>;
}
