"use client";

import { ReactNode } from "react";
import Shape from "./shape";

export default function Circle({
  isPreview,
  distanceUnit = 1.5,
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
  const Container = ({ children }: { children: ReactNode }) =>
    isPreview ? (
      <svg overflow={"visible"}>{children}</svg>
    ) : (
      <g data-component={id}>{children}</g>
    );

  const cx = Number(x) * distanceUnit;
  const cy = Number(y) * distanceUnit;
  const radius = Number(strRadius) * distanceUnit;
  console.log(distanceUnit);
  return (
    <Container>
      <circle fill="white" stroke="black" strokeWidth={2} cx={cx} cy={cy} r={radius} />
    </Container>
  );
}
