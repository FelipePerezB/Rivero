/* eslint-disable react-hooks/exhaustive-deps */
import { Mafs, Coordinates, Plot, labelPi } from "mafs";
// import CustomComponent from "./CustomComponent";
import getID from "src/getDoc/utils/getId";
import { useEffect, useRef, useState } from "react";

export default function LineChart({
  id = getID(),
  options: { size = "s", rangeX = "-10/10", rangeY = "-10/40", ecuation = "2 * x" },
}: {
  options: {
    size: "xs" | "s" | "m" | "l";
    rangeX: string;
    rangeY: string;
    ecuation: string,
  };
  id: string;
}) {
  const divRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>();
  const [lines, setLines] = useState<{
    x: { lines: number };
    y: { lines: number };
  }>();
  const heights = {
    xs: "7em",
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
  }, [size, divRef.current?.clientHeight]);

  const colors = {
    0: "var(--mafs-indigo)",
    1: "var(--mafs-violet)",
    2: "var(--mafs-green)",
    3: "var(--mafs-red)",
    4: "var(--mafs-yellow)",
  } as any;

  const ec = `(x) => ${ecuation}`;

  const n = parseInt(String(0 / 5)) * -5 + 0;

  return (
    <div data-component={id} style={{ width: "max-content", margin: "0 auto" }}>
      <div style={{ width: heights[size], height: heights[size] }} className="rounded-md overflow-hidden" ref={divRef}>
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
            {/* {ecua.map(({ ecuation }, i) => { */}

              {/* return ( */}
                <Plot.OfX
                  color={colors[n]}
                  key={ec}
                  weight={height / 75}
                  y={eval(ec)}
                />
              {/* ); */}
            {/* })} */}
          </Mafs>
        )}
      </div>
    </div>
  );
}
