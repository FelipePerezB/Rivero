import { CSSProperties, ReactNode } from "react";
import Link from "next/link";

export default function Card({
  children,
  href,
  className,
  interactive = false,
  styles,
}: {
  styles?: CSSProperties;
  className?: string;
  styled?: boolean;
  children?: ReactNode;
  href?: string;
  interactive?: boolean;
}) {
  const nodeClassName = `${className} w-full card ${
    interactive
      ? "cursor-pointer hover:scale-[98%] hover:bg-slate-50 transition-all duration-75"
      : "duration-150"
  }  `;

  return href ? (
    <Link style={styles} className={nodeClassName} href={href}>
      {children}
    </Link>
  ) : (
    <article style={styles} className={nodeClassName}>
      {children}
    </article>
  );
}
