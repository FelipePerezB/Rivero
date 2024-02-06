import { Role } from "@prisma/client";
import routeProtect from "./routeProtect";
import organizationCondition from "./organizationProtectCondition";

export default async function organizationProtect({
  organization,
}: {
  organization?: string | number;
}) {
  const res = await routeProtect({
    conditions: [organizationCondition(organization)],
  });

  return res;
}
