import React, { ReactNode } from "react";

export default function ScreenLayout({children}:{children: ReactNode}) {
  return (
    <div className="absolute top-16 left-0 w-[calc(100vw-4rem)] translate-x-[calc(50vw-50%)] text-[clamp(0.001em,2.82vw,20.5px)] ">
      {children}
    </div>
  );
}
