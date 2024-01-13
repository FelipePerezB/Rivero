import React, { ReactNode } from "react";

export default function SubTitle({ children }: { children: ReactNode }) {
  return <h3 className="text-sm font-extralight">{children}</h3>;
}
