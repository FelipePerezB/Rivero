import { currentUser } from "@clerk/nextjs";
import { Role } from "@prisma/client";
import CreatePracticeBtn from "./create-practice-btn";

export default async function PracticeBtn({ subject }: { subject: string }) {
  const user = await currentUser();
  return user?.publicMetadata?.role === Role.ADMIN ? (
    <CreatePracticeBtn subject={subject} />
  ) : (
    <div className="w-full"></div>
  );
}
