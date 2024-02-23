import { Text, Vector, vec } from "mafs";
import MafsContainer from "./mafs-container";

export default function CartesianPlot({
  isPreview,
  id,
  options: { tail: tailStr, tip: tipStr } = {tail: "-4,-4", tip: "3,3"},
}: {
  isPreview: boolean
  id: string
  options: {
    tail: string;
    tip: string;
  };
}) {
  const tail = tailStr
    ?.split(",")
    ?.map((coord) => Number(coord.trim())) as unknown as vec.Vector2;
  const tip = tipStr
    ?.split(",")
    ?.map((coord) => Number(coord.trim())) as unknown as vec.Vector2;
  const textX = (tail[1] - tail[0]) / 2;
  const textY = (tip[1] - tip[0]) / 2;
  return (
    <MafsContainer id={id} isPreview={isPreview}>
      {/* <Text size={20} x={textX} y={textY} attach="nw" attachDistance={15}>
        A
      </Text> */}
      <Vector weight={1.4} {...{ tip, tail }} />;
    </MafsContainer>
  );
}
