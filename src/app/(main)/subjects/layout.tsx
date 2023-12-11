import { currentUser } from "@clerk/nextjs";
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
