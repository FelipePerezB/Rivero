"use client";

import { ReactNode } from "react";
import Shape from "./shape";

export default function IrregularShape({
  isPreview,
  distanceUnit = 1.5,
  options: { coords: strData, sizes } = {
    sizes: false,
    coords: [
      "50, 0",
      "100, 40",
      "100, 80",
      "80, 100",
      "0, 100",
      "0, 60",
      "50, 50",
    ],
  },
  id,
}: {
  isPreview?: boolean;
  distanceUnit: number;
  options: {
    coords: string[];
    sizes: boolean
  };
  id: string;
}) {
  const data = strData?.map((coords) =>
    coords?.split(",")?.map((coord) => coord?.trim())
  ) as unknown as number[][];
  const coords = data?.map(([x, y], i) => ({
    x1: x,
    y1: y,
    x2: data?.at(i + 1)?.at(0) ?? data[0].at(0) ?? 10,
    y2: data?.at(i + 1)?.at(1) ?? data[0].at(1) ?? 10,
  }));

  const Container = ({ children }: { children: ReactNode }) =>
    isPreview ? (
      <svg overflow={"visible"}>{children}</svg>
    ) : (
      <g data-component={id}>{children}</g>
    );
    

  return (
    <Container>
      <Shape sizes={sizes} coords={coords} distanceUnit={distanceUnit} />
    </Container>
  );
}
