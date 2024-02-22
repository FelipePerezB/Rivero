import { CardinalDirection, Polygon, Text, Theme, Vector, vec } from "mafs";
import MafsContainer from "./mafs-container";
import alphabet from "src/constants/alphabet";

export default function CartesianPlot({
  id,
  isPreview,
  options: { coords: coordsStr, isPrime } = {
    coords: ["-2.5,2.5", "2.5,2.5", "2.5,-2.5", "-2.5,-2.5"],
    isPrime: false,
  },
}: {
  id: string;
  isPreview: boolean;
  options: {
    coords: string[];
    isPrime: boolean;
  };
}) {
  const coordsWithAttach = coordsStr.map((coords) =>
    coords.split(",").map((coord) => coord.trim())
  );
  const coords = coordsWithAttach.map(([x, y]) => [
    Number(x),
    Number(y),
  ]) as vec.Vector2[];

  return (
    <MafsContainer id={id} isPreview={isPreview}>
      <Polygon points={coords} color={Theme.pink} />
      {coords.map(([x, y], i) => {
        const letter = alphabet[i]?.toUpperCase()
        return (
          <Text
            size={17}
            key={"coord" + x + y}
            x={x}
            y={y}
            attach={coordsWithAttach[i][2] as CardinalDirection}
            svgTextProps={{ style: { fontWeight: "900" } }}
            attachDistance={8}
          >
            {`${letter}${isPrime ? "'" : ""}`}
          </Text>
        );
      })}
    </MafsContainer>
  );
}
