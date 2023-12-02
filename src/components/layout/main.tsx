import React, { ReactNode } from "react";

export default function Main({ children }: { children: ReactNode }) {
  return (
    <main className="flex flex-1 flex-col gap-3 p-4  h-full w-full mx-auto max-w-5xl">
      {children}
    </main>
  );
}
