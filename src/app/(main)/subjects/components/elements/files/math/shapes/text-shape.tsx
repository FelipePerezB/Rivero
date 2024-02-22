import { ReactNode } from "react";
import Shape from "./shape";

export default function IrregularShape({
  isPreview,
  distanceUnit = 1.5,
  options: { coords: strData, text, degrees } = {
    coords: "50, 0",
    text: "Texto",
    degrees: "0",
  },
  id,
}: {
  isPreview?: boolean;
  distanceUnit: number;
  options: {
    coords: string;
    degrees: string;
    text: string;
  };
  id: string;
}) {
  const [x, y] = strData
    ?.split(",")
    .map((coord) => coord?.trim()) as unknown as number[][];

  const scaledX = Number(x) * distanceUnit;
  const scaledY = Number(y) * distanceUnit;

  const Container = ({ children }: { children: ReactNode }) =>
    isPreview ? (
      <svg className="w-max" overflow={"visible"}>
        {children}
      </svg>
    ) : (
      <g data-component={id}>{children}</g>
    );

  return (
    <Container>
      <text
        transform={degrees ? `rotate(${degrees}, 48, 112)`: undefined}
        x={scaledX}
        y={scaledY}
        textAnchor="middle"
      >
        {text}
      </text>
    </Container>
  );
}
