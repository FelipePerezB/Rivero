"use client";
import styles from "../../styles/linechart.module.css";
import { Mafs, Coordinates, Plot } from "mafs";
import { useEffect, useRef, useState } from "react";

const getLarge = (ranges: string = "-10/10") => {
  const rangeArray = ranges?.split("/").map((range) => Number(range));
  const large = rangeArray[1] - rangeArray[0];
  return large;
};
const getViewBox = (range: string = "-10/10") =>
  range.split("/").map((range) => Number(range)) as [number, number];

export default function LineChart({
  id,
  options: { equation, rangeX, rangeY, size } = {
    size: "xs",
    rangeX: "-10/10",
    rangeY: "-10/40",
    equation: "2 * x",
  },
}: {
  options: {
    size: "xs" | "s" | "m" | "l";
    rangeX: string;
    rangeY: string;
    equation: string;
  };
  id: string;
}) {
  const regex = /^([-+/().]?[0-9]*\*?x?[\s]*)*$/;
  const divRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(100);

  const heights = {
    xs: "6em",
    s: "10em",
    m: "12em",
    l: "20em",
  };

  const defaultequation = (x: number) => x * 0;
  let eq: (num: number) => number;
  try {
    if (!regex.test(equation)) throw new Error("Invalid equation");
    if (typeof eval(`(x) => ${equation}`)(0) !== "number")
      throw new Error("Invalid equation");
    eq = eval(`(x) => ${equation}`);
  } catch (error) {
    eq = defaultequation;
  }

  useEffect(() => {
    const reSize = () => setHeight(divRef?.current?.clientHeight ?? 0);
    reSize();
    window.addEventListener("resize", reSize);
    return () => window.removeEventListener("resize", reSize);
  }, [size]);

  let linesNum = 4;
  Object.keys(heights).forEach((string, i) => {
    if (string == size) {
      linesNum = (i + 2) * 2;
    }
  });

  const largeX = getLarge(rangeX);
  const largeY = getLarge(rangeY);
  const range = largeX > largeY ? largeX : largeY;

  return (
    <div ref={divRef} data-component={id} className={`w-max`}>
      <div
        className={styles.linechart}
        style={{ width: heights[size], height: heights[size] }}
      >
        <div style={{ fontSize: size === "xs" ? "60%" : "100%" }}>
          <Mafs
            height={height}
            viewBox={{ x: getViewBox(rangeX), y: getViewBox(rangeY) }}
            width={height}
          >
            <Coordinates.Cartesian
              xAxis={{ lines: Number((range / linesNum).toFixed(0)) }}
              yAxis={{ lines: Number((range / linesNum).toFixed(0)) }}
              subdivisions={1.0005}
            />
            <Plot.OfX
              weight={size === "xs" ? 1.5 : 2.5}
              color="var(--mafs-blue)"
              y={eq}
            />
          </Mafs>
        </div>
      </div>
    </div>
  );
}
