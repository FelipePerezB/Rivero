import React, { ReactNode } from "react";
import Protect from "./protect";
import { Role } from "@prisma/client";

export default function OrganizationProtect({
  children,
  organizationId,
}: {
  children: ReactNode;
  organizationId: string;
}) {
  return (
    <Protect
      conditions={[
        {
          condition: (user) => {
            const organization = user?.publicMetadata?.organizationId;
            const role = user?.publicMetadata?.role as Role;
            return (
              Number(organization) === Number(organizationId) ||
              role === Role.ADMIN
            );
          },
          message: "No tienes permiso de acceder a esta institución",
        },
      ]}
      roles={[Role.ADMIN, Role.DIRECTOR, Role.TEACHER]}
    >
      {children}
    </Protect>
  );
}
