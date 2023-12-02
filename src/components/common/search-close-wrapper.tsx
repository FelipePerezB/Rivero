"use client";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

export default function SearchCloseWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  return <div onClick={() => router.back()}>{children}</div>;
}
