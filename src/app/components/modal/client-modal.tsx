'use client'
import ClientCloseWrapper from "../common/client-close-wrapper";
import Modal from "./modal";
import { Dispatch, ReactNode, SetStateAction } from "react";

export default function ClientModal({
  state,
  setState,
  title,
  children,
}: {
  state: boolean;
  setState: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  title: string;
}) {
  return (
    <Modal
      show={state}
      title={title}
      CloseWrapper={({ children }) => (
        <ClientCloseWrapper setState={setState}>{children}</ClientCloseWrapper>
      )}
    >
      {children}
    </Modal>
  );
}
