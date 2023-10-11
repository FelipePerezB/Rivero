import dynamic from "next/dynamic";
import React from "react";

// Necesario en app router y nextjs > 13.5
const imports = {
  document: dynamic(() => import(`./document`)),
  title: dynamic(() => import(`./title`)),
  section: dynamic(() => import(`./section`)),
  box: dynamic(() => import(`./box`)),
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
