"use client";
import { useSearchParams } from "next/navigation";
import SearchCloseWrapper from "../common/search-close-wrapper";
import { ReactNode } from "react";
import Sidebar from "./sidebar";

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
