import { SignUp } from "@clerk/nextjs";
import api from "src/utils/api";

export default async function Page({
  searchParams: { __clerk_ticket },
}: {
  searchParams: { [key: string]: string };
}) {
  return (
    <div className="flex justify-center w-full">
      <SignUp afterSignInUrl={"/home"}/>
    </div>
  );
}
