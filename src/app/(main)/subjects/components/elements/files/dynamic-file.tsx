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
  paragraph: dynamic(() => import(`./paragraph`)),
  excercises: dynamic(() => import(`./excercises`)),
  header: dynamic(() => import(`./header`)),
  set: dynamic(() => import(`./set`)),
  svg: dynamic(() => import(`./svg`)),
  plot: dynamic(() => import(`./box-plot`)),
  venn: dynamic(() => import(`./venn`)),
  table: dynamic(() => import(`./table`)),
  shape: dynamic(() => import(`./math/shapes/shape-canva`)),
  "regular-shape": dynamic(() => import(`./math/shapes/regular-shape`)),
  "irregular-shape": dynamic(() => import(`./math/shapes/irregular-shape`)),
  "shape-text": dynamic(() => import(`./math/shapes/text-shape`)),
  circle: dynamic(() => import(`./math/shapes/circle`)),
  "cartesian-plane": dynamic(() => import(`./math/cartesian/cartesian-plane`)),
  "cartesian-plot": dynamic(() => import(`./math/cartesian/cartesian-plot`)),
  "cartesian-vector": dynamic(() => import(`./math/cartesian/cartesian-vector`)),
  "cartesian-polygon": dynamic(() => import(`./math/cartesian/cartesian-polygon`)),
  "cartesian-text": dynamic(() => import(`./math/cartesian/cartesian-text`)),
} as any;

export default function DynamicElement({
  name,
  attrs,
}: {
  name: string;
  attrs: { [key: string]: unknown };
}) {
  const Component = imports[name];
  return Component ? (
    <Component {...{ ...attrs }} key={`dynamic-component-${attrs?.id}`} />
  ) : (
    <></>
  );
}
