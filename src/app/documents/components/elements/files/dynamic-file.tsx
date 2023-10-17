import dynamic from "next/dynamic";
import React from "react";

// Necesario en app router y nextjs > 13.5
const imports = {
  document: dynamic(() => import(`./document`)),
  evaluation: dynamic(() => import(`./evaluation`)),
  practice: dynamic(() => import(`./practice`)),
  title: dynamic(() => import(`./title`)),
  sle: dynamic(() => import(`./sle`)),
  section: dynamic(() => import(`./section`)),
  box: dynamic(() => import(`./box`)),
  question: dynamic(() => import(`./question`)),
  linechart: dynamic(() => import(`./linechart`)),
} as any;

export default function DynamicElement({
  name,
  attrs,
}: {
  name: string;
  attrs: { [key: string]: unknown };
}) {
  const Component = imports[name];
  return <Component {...{ ...attrs }} />;
}
