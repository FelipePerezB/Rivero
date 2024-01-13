import React, { ReactNode } from "react";

export default function Title({ children }: { children: ReactNode }) {
  return <h2 className="text-2xl sm:text-3xl font-semibold">{children}</h2>;
}
