import Link from "next/link";
import React from "react";
import Accordion from "./accordion";

export default function LinksAccordion({
  summary,
  content,
}: {
  summary: string | React.ReactNode;
  content?: {
    title: string;
    href: string;
  }[];
}) {
  return (
    <Accordion summary={summary}>
      <ul className="border-t mt-2 pt-2.5">
        {content?.map(({ href, title }) => (
          <li
            key={"accordion-item-" + title}
            className="p-2 px-3 hover:bg-slate-100 rounded-sm"
          >
            <Link href={href}>{title}</Link>
          </li>
        ))}
      </ul>
    </Accordion>
  );
}
