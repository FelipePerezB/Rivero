import { Dispatch, ReactNode, SetStateAction } from "react";

export default function ClientCloseWrapper({
  children,
  setState,
}: {
  children: ReactNode;
  setState: Dispatch<SetStateAction<boolean>>;
}) {
  return <div onClick={() => setState(false)}>{children}</div>;
}