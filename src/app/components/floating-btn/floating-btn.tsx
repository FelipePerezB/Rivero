import Link from "next/link";
import React from "react";

export default function FloatingBtn({
  children,
  href,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className="fixed right-8 bottom-8 bg-black-1000 text-white rounded-full w-14 h-14 flex items-center justify-center hover:scale-95 hover:text-gray-300 transition-all duration-150 hover:duration-75">
      {children}
    </Link>
  );
}
