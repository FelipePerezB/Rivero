"use client";
import { currentUser } from "@clerk/nextjs";
import { createMessages } from "@components/common/alert/alert-message";
import { Role } from "@prisma/client";
import Card from "@components/cards/Card";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import api from "src/utils/api";

export default function CreatePracticeBtn({ subject }: { subject: string }) {
  const router = useRouter();
  return (
    <button
      // onClick={() => {
      //   toast
      //     .promise(
      //       api(`notes/practice/${subject}`, { method: "POST" }),
      //       createMessages
      //     )
      //     .then((res) => {
      //       if (res?.data?.subjectId) router.push(`/subjects/${subject}/practice/edit`)
      //     });
      // }}
      className="w-full h-full"
    >
      <Card interactive>Crear prática</Card>
    </button>
  );
}
