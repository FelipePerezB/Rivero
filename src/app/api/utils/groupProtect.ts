import { Role } from "@prisma/client";
import routeProtect from "./routeProtect";

export default async function groupProtect({
  group,
}: {
  group?: string | number;
}) {
  const res = await routeProtect({
    conditions: [
      {
        condition: (user) => {
          const role = user?.publicMetadata?.role as Role;
          const userGroup = user?.publicMetadata?.group;
          return (
            (!role ||
              role === Role.STUDENT ||
              Number(userGroup) !== Number(group)) &&
            role !== Role.ADMIN
          );
        },
      },
    ],
  });

  return res;
}
