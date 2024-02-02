import { Role } from "@prisma/client";
import routeProtect from "./routeProtect";

export default async function roleProtect({roles}:{roles: Role[]}) {
  const res = await routeProtect({
    conditions: [
      {
        condition: (user) => {
          const role = user?.publicMetadata?.role as Role;
          return !roles.includes(role);
        },
      },
    ],
  });

  return res;
}
