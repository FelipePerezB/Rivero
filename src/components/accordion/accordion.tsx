import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "@components/cards/Card";
import React from "react";

export default function Accordion({
  summary,
  children,
}: {
  children: React.ReactNode;
  summary: string | React.ReactNode;
}) {
  return (
    <Card className="max-w-lg p-0">
      <details className="group cursor-pointer">
        <summary className="flex justify-between items-center list-none h-max px-4 py-2.5">
          {summary}
          <FontAwesomeIcon
            className="h-3 w-3 text-slate-700 group-open:rotate-90 transition-transform group-open:duration-75 duration-150"
            icon={faChevronRight}
          />
        </summary>
        <hr className="mx-2"/>
        <div className="p-2">{children}</div>
      </details>
    </Card>
  );
}
