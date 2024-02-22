import { Polygon, Text, Theme, Vector, vec } from "mafs";
import MafsContainer from "./mafs-container";
import alphabet from "src/constants/alphabet";

export default function CartesianPlot({
  id,
  isPreview,
  options: { coords, text } = {
    coords: "2,3",
    text: "Text",
  },
}: {
  id: string;
  isPreview: boolean;
  options: {
    coords: string;
    text: string;
  };
}) {
  const [x, y] = coords.split(",").map((coord) => Number(coord.trim()));

  return (
    <MafsContainer id={id} isPreview={isPreview}>
      <Text size={20} svgTextProps={{style: {fontWeight: "800"}}} key={"coord" + x + y} x={x} y={y}>
        {text}
      </Text>
    </MafsContainer>
  );
}
