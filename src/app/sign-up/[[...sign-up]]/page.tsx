import { SignUp } from "@clerk/nextjs";

export default function Page({
  searchParams: { __clerk_ticket },
}: {
  searchParams: { [key: string]: string };
}) {
  console.log(__clerk_ticket);
  const decodedToken = JSON.parse (atob (__clerk_ticket.split ('.')[1]))
  console.log(decodedToken)
  return <SignUp />;
}
