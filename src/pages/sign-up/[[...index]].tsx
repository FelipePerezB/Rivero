import { SignUp, useAuth } from "@clerk/nextjs";

export default function Page() {
  return <SignUp redirectUrl="https://rivero.vercel.app/"/>;
}