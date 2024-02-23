/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import styles from "../../../../styles/linechart.module.css";
import { Mafs, Coordinates, Plot } from "mafs";
import { useEffect, useRef, useState } from "react";
import DynamicElement from "../../dynamic-file";
import { Component } from "src/app/documents/edit/models/component";

const getLarge = (ranges: string = "-10/10") => {
  const rangeArray = ranges?.split("/").map((range) => Number(range));
  const large = rangeArray[1] - rangeArray[0];
  return large;
};
const getViewBox = (range: string = "-10/10") =>
  range.split("/").map((range) => Number(range)) as [number, number];

export default function CartesianPlane({
  id,
  options: { children, rangeX, rangeY, size } = {
    size: "xs",
    rangeX: "-10/10",
    rangeY: "-10/40",
    children: [{type: "cartesian-plot", options: {}}],
  },
}: {
  options: {
    size: "xs" | "sm" | "m" | "l";
    rangeX: string;
    rangeY: string;
    children: Component[];
  };
  id: string;
}) {

  const divRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(100);

  const heights = {
    xs: "6em",
    sm: "10em",
    m: "12em",
    l: "20em",
  };

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
    <div ref={divRef} data-component={id} className={`w-max mx-auto`}>
      <div
        className={styles.linechart}
        style={{ width: heights[size], height: heights[size] }}
      >
        <div style={{ fontSize: size !== "l" ? "80%" : "100%" }}>
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
            {children?.map((child, i) => (
              <DynamicElement
                key={`shape-${i}-${child.type}-${child?.id}`}
                attrs={{ ...child, number: i + 1 }}
                name={child.type}
              />
            ))}
          </Mafs>
        </div>
      </div>
    </div>
  );
}
