'use client'
import { useSearchParams } from "next/navigation";
import SearchCloseWrapper from "../common/search-close-wrapper";
import Modal from "./modal";
import { ReactNode } from "react";

export default function SearchModal({
  title,
  sidebarKey = "sidebar",
  id,
  children,
}: {
  title: string;
  children: ReactNode;
  sidebarKey?: string;
  id: string;
}) {
  const sidebarId = useSearchParams()?.get(sidebarKey);
  const show = sidebarId === id;
  return (
    <Modal
      show={show}
      title={title}
      CloseWrapper={({ children }) => (
        <SearchCloseWrapper>{children}</SearchCloseWrapper>
      )}
    >
      {children}
    </Modal>
  );
}
