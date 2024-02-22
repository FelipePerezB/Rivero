import { Plot } from "mafs";
import MafsContainer from "./mafs-container";
const regex = /^([-+/().]?[0-9]*\*?x?[\s]*)*$/;

export default function CartesianPlot({
  isPreview,
  id,
  options: { equation  } = {equation: "2 * x"},
}: {
  isPreview: boolean
  id: string;
  options: {
    equation: string;
  };
}) {
  const defaultequation = (x: number) => x * 0;
  let purifyEquations = defaultequation;
  try {
    if (!regex.test(equation)) return;
    if (typeof eval(`(x) => ${equation}`)(0) !== "number")
      throw new Error("Invalid equation");
    purifyEquations = eval(`(x) => ${equation}`);
  } catch (error) {
    purifyEquations = defaultequation;
  }
  return <MafsContainer id={id} isPreview={isPreview}>
    <Plot.OfX color="var(--mafs-indigo)" y={purifyEquations} />

  </MafsContainer>
}
