import Card from "@components/cards/Card";
import React from "react";
import capFirst from "src/utils/capFirst";

export default function LinkCard({
  href,
  description,
  title,
}: {
  href: string,
  title: string;
  description: string;
}) {
  return (
    <Card href={href} interactive>
      <div className="flex flex-col gap-1 w-full min-w-[150px]">
        <span className="text-lg font-medium text-blue-500">
          {capFirst(title)}
        </span>
        <span className="text-xs font-extralight">{description}</span>
      </div>
    </Card>
  );
}
