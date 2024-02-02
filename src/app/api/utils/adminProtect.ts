import { Role } from "@prisma/client";
import routeProtect from "./routeProtect";

export default async function adminProtect() {
  const res = await routeProtect({
    conditions: [
      {
        condition: (user) => {
          const role = user?.publicMetadata?.role as Role;
          return role !== Role.ADMIN;
        },
      },
    ],
  });

  return res;
}
