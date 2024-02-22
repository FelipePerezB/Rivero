"use client";
import { ReactNode } from "react";
import ShapeContainer from "./shape-container";

export default function Circle({
  isPreview,
  distanceUnit = 1,
  options: { radius: strRadius, coords, angles } = {
    radius: "50",
    coords: "50,50",
    angles: "0,90",
  },
  id,
}: {
  isPreview?: boolean;
  distanceUnit: number;
  options: {
    angles: string;
    radius: string;
    coords: string;
  };
  id: string;
}) {
  const [x, y] = coords.split(",").map((coord) => Number(coord.trim()));
  const [startAngle, endAngle] = angles
    .split(",")
    .map((angle) => Number(angle.trim()) - 90);
  const radius = Number(strRadius);

  const startAngleRad = (Math.PI / 180) * startAngle;
  const endAngleRad = (Math.PI / 180) * endAngle;

  // Calcular las coordenadas del punto inicial y final del arco
  const startX = distanceUnit * (x + radius * Math.cos(startAngleRad));
  const startY = distanceUnit * (y + radius * Math.sin(startAngleRad));
  const endX = distanceUnit * (x + radius * Math.cos(endAngleRad));
  const endY = distanceUnit * (y + radius * Math.sin(endAngleRad));
  const pathData = `
  M ${x * distanceUnit}, ${y * distanceUnit} 
  L ${startX} ${startY}
  A ${radius * distanceUnit} ${radius * distanceUnit}, 0 0, 1 ${endX}, ${endY} z
`;
  return (
    <ShapeContainer {...{ id, isPreview }}>
      <path d={pathData} fill="lightgray" stroke="black" strokeWidth="2" />
    </ShapeContainer>
  );
}
