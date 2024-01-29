import { CSSProperties, ReactNode } from "react";
import Link from "next/link";

export default function Card({
  title,
  children,
  href,
  className,
  interactive = false,
  styles,
}: {
  title?: string
  styles?: CSSProperties;
  className?: string;
  styled?: boolean;
  children?: ReactNode;
  href?: string;
  interactive?: boolean;
}) {
  const nodeClassName = `w-full  ${className} p-md  shadow-md border border-border rounded-sm ${
    interactive
      ? "cursor-pointer hover:scale-[98%] hover:bg-slate-50 transition-all duration-75"
      : "duration-150"
  }  `;

  return href ? (
    <Link title={title} style={styles} className={nodeClassName} href={href}>
      {children}
    </Link>
  ) : (
    <article title={title} style={styles} className={nodeClassName}>
      {children}
    </article>
  );
}
