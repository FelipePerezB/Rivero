import { currentUser } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/dist/types/server";
import { Role } from "@prisma/client";

export default async function routeProtect({
  conditions,
}: {
  conditions?: { condition: (user: User) => boolean }[];
}) {
  const user = await currentUser();
  if (!user?.id) return false;
  if (conditions?.length)
    for (let i = 0; i < conditions?.length; i++) {
      const { condition } = conditions[i] ?? {};
      return !condition(user);
    }
}
