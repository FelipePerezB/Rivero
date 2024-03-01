import { ReactNode } from "react";
import Shape from "./shape";
import ShapeContainer from "./shape-container";

export default function IrregularShape({
  isPreview,
  distanceUnit = 1,
  options: { coords: strData, text, degrees } = {
    coords: "50, 50",
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
    ?.map((coord) => coord?.trim()) as unknown as number[][];

  const scaledX = Number(x) * distanceUnit;
  const scaledY = Number(y) * distanceUnit;

  return (
    <ShapeContainer {...{ id, isPreview }}>
      <text
        transform={degrees ? `rotate(${degrees}, ${scaledX}, ${scaledY})` : undefined}
        x={scaledX}
        y={scaledY}
        textAnchor="middle"
      >
        {text}
      </text>
    </ShapeContainer>
  );
}
