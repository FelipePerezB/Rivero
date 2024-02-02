import React, { ReactNode } from "react";

export default function StatsCardsGroup({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row w-full gap-md">{children}</div>
  );
}
