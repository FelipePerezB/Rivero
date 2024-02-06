import { User } from "@clerk/nextjs/dist/types/server";
import { Role } from "@prisma/client";

export default function organizationCondition(organization?: string | number) {
  return {
    condition: (user: User) => {
      const role = user?.publicMetadata?.role as Role;
      const userOrganizationId = user?.publicMetadata?.organizationId;
      return (
        (!role ||
          role === Role.STUDENT ||
          Number(userOrganizationId) !== Number(organization)) &&
        role !== Role.ADMIN
      );
    },
  };
}
