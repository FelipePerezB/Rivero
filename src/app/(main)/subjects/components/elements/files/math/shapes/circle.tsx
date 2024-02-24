"use client";

import { ReactNode } from "react";
import Shape from "./shape";
import ShapeContainer from "./shape-container";

export default function Circle({
  isPreview,
  distanceUnit = 1,
  options: { radius: strRadius, x, y, strokeDash } = {
    strokeDash:"0",
    radius: "50",
    x: "50",
    y: "50",
  },
  id,
}: {
  isPreview?: boolean;
  distanceUnit: number;
  options: {
    strokeDash: string
    radius: string;
    x: string;
    y: string;
  };
  id: string;
}) {
  const cx = Number(x) * distanceUnit;
  const cy = Number(y) * distanceUnit;
  const [radiusX, radiusY] = strRadius
    .split(",")
    .map((radius) => Number(radius) * distanceUnit);

  console.log({radiusX, radiusY})
  return (
    <ShapeContainer {...{ id, isPreview }}>
      <ellipse
        fill="none"
        stroke="black"
        strokeWidth={2}
        cx={cx}
        cy={cy}
        rx={radiusX}
        ry={radiusY ?? radiusX}
        strokeDasharray={Number(strokeDash ?? 0) * distanceUnit}
      />
    </ShapeContainer>
  );
}
