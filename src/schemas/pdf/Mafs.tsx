/* eslint-disable react-hooks/exhaustive-deps */
import { Mafs, Coordinates, Plot, labelPi } from "mafs";
import CustomComponent from "./CustomComponent";
import getID from "src/getDoc/utils/getId";
import { useEffect, useRef, useState } from "react";
import styles from "../styles/reportTemplate.module.css";

export default function LineChart({
  id = getID(),
  size = "s",
  rangeX = "-10/10",
  rangeY = "-10/40",
  ecuations = [{ ecuation: "0.1 * x ** 2 - 4" }],
}: {
  id: string;
  size: "xs" | "s" | "m" | "l";
  rangeX: string;
  rangeY: string;
  ecuations: { ecuation: string }[];
}) {
  const divRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>();
  const [lines, setLines] = useState<{
    x: { lines: number };
    y: { lines: number };
  }>();
  const heights = {
    xs: "6em",
    s: "10em",
    m: "15em",
    l: "20em",
  };
  useEffect(() => {
    divRef.current && setHeight(divRef.current?.clientHeight);

    let linesNum;
    Object.keys(heights).forEach((string, i) => {
      if (string == size) {
        linesNum = (i + 2) * 2;
      }
    });
    const rangeXArray = rangeX.split("/").map((range) => Number(range));
    const rangeYArray = rangeY.split("/").map((range) => Number(range));

    const largeX = rangeXArray[1] - rangeXArray[0];
    const largeY = rangeYArray[1] - rangeYArray[0];
    const range = largeX > largeY ? largeX : largeY;
    linesNum &&
      setLines({
        x: { lines: Number((range / linesNum).toFixed(0)) },
        y: { lines: Number((range / linesNum).toFixed(0)) },
      });
  }, [size]);

  return (
    <CustomComponent id={id} style={{ width: "max-content" }}>
      <div
        style={{ width: heights[size], height: heights[size] }}
        className={styles.linechart}
        ref={divRef}
      >
        {height && lines && (
          <Mafs
            height={height}
            viewBox={{
              x: rangeX.split("/").map((range) => Number(range)) as [
                number,
                number
              ],
              y: rangeY.split("/").map((range) => Number(range)) as [
                number,
                number
              ],
            }}
            width={height}
          >
            <Coordinates.Cartesian
              xAxis={lines.x}
              yAxis={lines.y}
              subdivisions={1.001}
            />
            {ecuations.map(({ ecuation }) => {
              const ec = `(x) => ${ecuation}`;
              return (
                <Plot.OfX
                  color="#rgb(28, 28, 28)"
                  key={ec}
                  weight={height / 75}
                  y={eval(ec)}
                />
              );
            })}
          </Mafs>
        )}
      </div>
    </CustomComponent>
  );
}
