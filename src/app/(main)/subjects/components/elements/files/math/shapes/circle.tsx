"use client";

import { ReactNode } from "react";
import Shape from "./shape";
import ShapeContainer from "./shape-container";

export default function Circle({
  isPreview,
  distanceUnit = 1,
  options: { radius: strRadius, x, y } = {
    radius: "50",
    x: "50",
    y: "50",
  },
  id,
}: {
  isPreview?: boolean;
  distanceUnit: number;
  options: {
    radius: string;
    x: string;
    y: string;
  };
  id: string;
}) {
  const cx = Number(x) * distanceUnit;
  const cy = Number(y) * distanceUnit;
  const radius = Number(strRadius) * distanceUnit;
  console.log(distanceUnit);
  return (
    <ShapeContainer {...{ id, isPreview }}>
      <circle
        fill="none"
        stroke="black"
        strokeWidth={2}
        cx={cx}
        cy={cy}
        r={radius}
      />
    </ShapeContainer>
  );
}
