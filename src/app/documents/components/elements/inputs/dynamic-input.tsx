import dynamic from "next/dynamic";
import React from "react";

// Necesario en app router y nextjs > 13.5
const imports = {
  children: dynamic(() => import(`./children`)),
  form: dynamic(() => import(`./form`)),
  options: dynamic(() => import(`./options`)),
  "rich-text": dynamic(() => import(`./rich-text`)),
  text: dynamic(() => import(`./text`)),
} as any;

export default function DynamicInput({
  name,
  attrs,
}: {
  name: string;
  attrs: { [key: string]: unknown };
}) {
  const Component = imports[name];
  return <Component {...{ ...attrs }} />;
}
