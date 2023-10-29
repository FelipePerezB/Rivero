import { currentUser } from "@clerk/nextjs";
import Card from "@components/Card";
import NavigationCard from "@components/cards/navigationCard/NavigationCard";
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
