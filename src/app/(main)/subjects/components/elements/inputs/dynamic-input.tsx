import dynamic from "next/dynamic";
import React from "react";

// Necesario en app router y nextjs > 13.5
const imports = {
  children: dynamic(() => import(`./children`)),
  options: dynamic(() => import(`./options`)),
  text: dynamic(() => import(`./text`)),
  boolean: dynamic(() => import(`./boolean`)),
  array: dynamic(() => import(`./array`)),
  "sub-inputs": dynamic(() => import(`./sub-inputs`)),
  "rich-text": dynamic(() => import(`./rich-text`)),
} as any;

export default function DynamicInput({
  name,
  attrs,
}: {
  name: string;
  attrs: { [key: string]: unknown };
}) {
  const Component = imports[name];
  return (
    <Component
      {...{ ...attrs }}
      key={`dynamic-input-${attrs.parentId}-${String(attrs.value)}`}
    />
  );
}
