import React, { ReactNode } from "react";

export default function ScreenLayout({children}:{children: ReactNode}) {
  return (
    <div className="absolute top-14 left-0 w-full h-full min-h-screen print:text-[2.2vw] print:top-0 print:left-0 print:w-screen">
      {children}
    </div>
  );
}
