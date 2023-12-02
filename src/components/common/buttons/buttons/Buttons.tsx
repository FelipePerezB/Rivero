import { ReactNode } from "react";

export default function Buttons({ children }: { children: ReactNode }) {
  return <div className="flex gap-3.5 mt-1">{children}</div>;
}
