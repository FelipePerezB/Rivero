import GetComponent from "@components/create-components/edit-document/get-component";
import React, { useEffect, useMemo, useRef } from "react";

export default function Document({
  type,
  title,
  options,
  id,
}: {
  title: string;
  type: string;
  options: {
    children: {
      type: string;
      id: string;
      options: { [key: string]: unknown };
    }[];
  };
  id: string;
}) {
  return (
    <div className="print:text-[calc(100vw*(13/450))]">
      <div
        id="document-container"
        data-component={id}
        className="flex flex-col gap-4 print:gap-0 text-[0.95em]"
      >
        {options?.children.map((child, i) => (
          <GetComponent
            key={`doc-${id}}`}
            attrs={{
              ...child,
              document: {
                title,
              },
              options: {
                ...child.options,
                number: i + 1,
                lastPage: i + 1 === options.children.length,
              },
            }}
            name={child.type}
            folder="documents"
          />
        ))}
      </div>
    </div>
  );
}
