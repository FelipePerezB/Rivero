import React, { ReactNode } from "react";
import Card from "./Card";

export default function StatsCard({children}:{children: ReactNode}) {
  return <Card className="flex justify-between items-start h-full">
    {children}
  </Card>;
}
