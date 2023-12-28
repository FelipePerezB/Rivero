import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";
import getUser from "src/utils/getUser";

type Props = {
  children: ReactNode;
};

export default async function Layout({ children }: Props) {
  const user = await getUser();
  if (!user?.publicMetadata?.role) {
    redirect("/");
  }
  return <>{children}</>;
}
