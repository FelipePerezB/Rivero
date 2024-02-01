import Protect from "@components/admin/protect/protect";
import { Role } from "@prisma/client";
import React, { ReactNode } from "react";

export default function DocumentsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <Protect roles={[Role.ADMIN]}>{children}</Protect>;
}
