import Card from "@components/Card";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function Accordion({
  summary,
  children,
}: {
  children: React.ReactNode;
  summary: string | React.ReactNode;
}) {
  return (
    <Card className="max-w-lg">
      <details className="group cursor-pointer">
        <summary className="flex justify-between items-center list-none h-max px-2">
          {summary}
          <FontAwesomeIcon
            className="h-3 w-3 text-slate-700 group-open:rotate-90 transition-transform group-open:duration-75 duration-150"
            icon={faChevronRight}
          />
        </summary>
        {children}
      </details>
    </Card>
  );
}
