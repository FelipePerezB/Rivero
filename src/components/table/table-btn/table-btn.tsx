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
  const className = "hover:bg-gray-50 flex items-center gap-2 p-0.5 rounded-sm";
  if (href)
    return (
      <Link className={className} href={href}>
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
