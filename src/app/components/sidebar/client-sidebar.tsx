"use client";
import { Dispatch, ReactNode, SetStateAction } from "react";
import ClientCloseWrapper from "../common/client-close-wrapper";
import Sidebar from "./sidebar";

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
