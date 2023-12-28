import Link from "next/link";
import React, { ReactNode } from "react";
import capFirst from "src/utils/capFirst";

export default function CardWithItem({
  href,
  title,
  children,
  subtitle,
}: {
  href: string;
  title: string;
  children: ReactNode;
  subtitle: ReactNode | string;
}) {
  return (
    <Link
      href={href}
      className="flex flex-col border rounded-md max-w-xs w-full h-48 p-0 overflow-hidden hover:scale-95 transition-all duration-150 cursor-pointer shadow-sm"
    >
      <div className="flex flex-col items-center justify-center w-full h-4/6 bg-blue-50/20 p-6">
        {children}
      </div>
      <div className="flex flex-col w-full h-2/6 border-t p-2 justify-center">
        <h4 className="text-lg font-semibold">{capFirst(title)}</h4>
        <span className="text-xs text-gray-400">{subtitle}</span>
        {/* <Tags tags={Topics.map(({ name }) => name)} /> */}
      </div>
    </Link>
  );
}
