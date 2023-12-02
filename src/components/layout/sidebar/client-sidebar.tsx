"use client";
import { Dispatch, ReactNode, SetStateAction } from "react";
import Sidebar from "./sidebar";
import ClientCloseWrapper from "@components/common/client-close-wrapper";

export default function ClientSidebar({
  state,
  setState,
  children,
}: {
  state: boolean;
  setState: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}) {
  return (
    <Sidebar
      show={state}
      CloseWrapper={({ children }) => (
        <ClientCloseWrapper setState={setState}>{children}</ClientCloseWrapper>
      )}
    >
      {children}
    </Sidebar>
  );
}
