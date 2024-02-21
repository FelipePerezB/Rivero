"use client";

import { useEffect, useRef, useState } from "react";
import { Component } from "src/app/documents/edit/models/component";
import DynamicElement from "../../dynamic-file";

export default function ShapeCanva({
  options: { children, size } = {
    size: "md",
    children: [{ type: "regular-shape", options: {} }],
  },
  id,
}: {
  options: {
    size: "xs" | "sm" | "md" | "lg";
    children: Component[];
  };
  id: string;
}) {

  const sizes = {
    xs: "6em",
    sm: "8em",
    md: "10em",
    lg: "15em",
  };

  const svgRef = useRef<SVGSVGElement>(null);
  const [containerWidth, setContainerWidth] = useState(10);
  const distanceUnit = containerWidth / Number(100);
  useEffect(() => {
    const width = svgRef.current?.clientWidth ?? 10;
    setContainerWidth(width);
  }, [size]);
  console.log(distanceUnit);

  return (
    <svg
      data-component={id}
      ref={svgRef}
      key={`svg-${containerWidth.toFixed(1)}`}
      width={sizes[size]}
      height={sizes[size]}
      overflow={"visible"}
    >
      {children?.map((child, i) => (
        <DynamicElement
          key={`shape-${i}-${child.type}-${child?.id}`}
          attrs={{ ...child, number: i + 1, distanceUnit }}
          name={child.type}
        />
      ))}
    </svg>
  );
}
