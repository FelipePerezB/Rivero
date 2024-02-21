"use client";

import { ReactNode } from "react";
import Shape from "./shape";

export default function RegularShape({
  isPreview,
  distanceUnit = 1.5,
  options: { sides: strSides, x, y, radius: strRadius } = {
    sides: "5",
    radius: "50",
    x: "50",
    y: "50",
  },
  id,
}: {
  isPreview?: boolean;
  distanceUnit: number;
  options: {
    sides?: string;
    x: string;
    y: string;
    radius: string;
  };
  id: string;
}) {
  const sides = Number(strSides);

  const Container = ({ children }: { children: ReactNode }) =>
    isPreview ? (
      <svg overflow={"visible"}>{children}</svg>
    ) : (
      <g data-component={id}>{children}</g>
    );

  const centerX = Number(x); // Coordenada x del centro del pentágono
  const centerY = Number(y); // Coordenada y del centro del pentágono
  const radius = Number(strRadius); // Radio del pentágono
  const startAngle = -Math.PI / 2; // Ángulo inicial (en radianes), -90 grados para que la base esté en la parte inferior

  const shapeAngles = 360 / sides;
  const coords = [];
  for (let i = 0; i < sides; i++) {
    const angle = startAngle + (i * shapeAngles * Math.PI) / 180; // Ángulo en radianes
    const x1 = centerX + radius * Math.cos(angle); // Coordenada x del vértice
    const y1 = centerY + radius * Math.sin(angle); // Coordenada y del vértice
    const nextAngle = startAngle + ((i + 1) * shapeAngles * Math.PI) / 180; // Siguiente ángulo en radianes
    const x2 = centerX + radius * Math.cos(nextAngle); // Coordenada x del siguiente vértice
    const y2 = centerY + radius * Math.sin(nextAngle); // Coordenada y del siguiente vértice
    coords.push({ x1, y1, x2, y2 });
  }

  console.log(distanceUnit);
  return (
    <Container>
      <Shape coords={coords} distanceUnit={distanceUnit} />
    </Container>
  );
}
