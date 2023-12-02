import Link from "next/link";
import React, { ReactNode } from "react";

export default function TableBtn({
  onClick,
  children,
  href,
}: {
  href?: string;
  onClick?: () => void;
  children: ReactNode | string;
}) {
  const className = "flex items-center gap-2 p-0.5 rounded-sm hover:text-blue-500";
  if (href)
    return (
      <Link prefetch className={className} href={href}>
        {children}
      </Link>
    );
  else if (onClick)
    return (
      <button onClick={onClick} className={className}>
        {children}
      </button>
    );
}
