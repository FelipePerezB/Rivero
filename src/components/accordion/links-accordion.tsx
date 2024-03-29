import Link from "next/link";
import React from "react";
import Accordion from "./accordion";

export default function LinksAccordion({
  summary,
  content,
}: {
  summary: string | React.ReactNode;
  content?: {
    name: string;
    href: string;
  }[];
}) {
  return (
    <Accordion summary={summary}>
      <ul className="flex flex-col gap-1">
        {content?.map(({ href, name }) => (
          <li
            key={"accordion-item-" + name}
            className="hover:bg-slate-100 rounded-sm"
          >
            <Link className="inline-block w-full p-2 px-3" href={href}>{name}</Link>
          </li>
        ))}
      </ul>
    </Accordion>
  );
}
