"use client";
import { useSearchParams } from "next/navigation";
import { ReactNode } from "react";
import Sidebar from "./sidebar";
import SearchCloseWrapper from "@components/common/search-close-wrapper";

export default function SearchSidebar({
  sidebarKey = "sidebar",
  id,
  children,
}: {
  children: ReactNode;
  sidebarKey?: string;
  id: string;
}) {
  const sidebarId = useSearchParams()?.get(sidebarKey);
  const show = sidebarId === id;
  return (
    <Sidebar show={show} CloseWrapper={SearchCloseWrapper}>
      {children}
    </Sidebar>
  );
}
