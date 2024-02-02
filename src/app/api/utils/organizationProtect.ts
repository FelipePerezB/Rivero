import { Role } from "@prisma/client";
import routeProtect from "./routeProtect";

export default async function organizationProtect({
  organization,
}: {
  organization?: string | number;
}) {
  const res = await routeProtect({
    conditions: [
      {
        condition: (user) => {
          const role = user?.publicMetadata?.role as Role;
          const userOrganizationId = user?.publicMetadata?.organizationId;
          return (
            (!role ||
              role === Role.STUDENT ||
              Number(userOrganizationId) !== Number(organization))
               &&
            role !== Role.ADMIN
          );
        },
      },
    ],
  });

  return res;
}
