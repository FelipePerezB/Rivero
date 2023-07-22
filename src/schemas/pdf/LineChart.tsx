import React, { useEffect, useRef, useState } from "react";
import getID from "src/getDoc/utils/getId";
import CustomComponent from "./CustomComponent";
import styles from "../styles/reportTemplate.module.css";

function calcularAnguloRotacion(
  x1: number,
  y1: number,
  x2: number,
  y2: number
) {
  // Calcular las diferencias entre las coordenadas
  const deltaX = x2 - x1;
  const deltaY = y2 - y1;

  // Calcular el ángulo en radianes utilizando la función atan2()
  const radianes = Math.atan2(deltaY, deltaX);

  // Convertir el ángulo de radianes a grados
  let grados = radianes * (180 / Math.PI);

  // Asegurarse de que el ángulo esté en el rango de 0 a 360 grados
  if (grados < 0) {
    grados += 360;
  }

  return grados;
}

export default function LineChart({
  title = "TITLE",
  id = getID(),
  size = "medium",
  ecuations = [{ n: 0, m: 1 }],
  range = {
    min: 0,
    max: 10,
  },
}: {
  id?: string;
  title: string;
  size?: string;
  ecuations?: {
    n: number;
    m: number;
  }[];
  range: {
    min: number;
    max: number;
  };
}) {
  const [rangeY, setRangeY] = useState<{ max: number; min: number }>();
  const [coords, setCoords] = useState<any>();
  const [width, setWidth] = useState<number>();
  const axis = useRef<any>();
  useEffect(() => {
    setWidth(axis.current?.clientWidth);
  }, [axis]);
  const getCoords = (
    { m = 1, n = 0 }: { m: number; n: number },
    { min = 0, max = 10 }: { min: number; max: number }
  ) => {
    let coords = [];
    const range = max - min;
    const N = 5;
    const interval = range / N;
    const arrayY = [];
    for (let i = min; i <= max; i += interval) {
      const y = i * m + n;
      arrayY.push(y);
      coords.push({ x: Number(i.toFixed(1)), y });
    }
    const sortedArrayY = arrayY.sort((a, b) => a - b);
    setRangeY({
      max: sortedArrayY.at(-1) as number,
      min: sortedArrayY.at(0) as number,
    });
    return coords;
  };

  //
  //
  const getSvgCoords = () => {
    const coords = getCoords(ecuations[0], range);
    if (width && rangeY) {
      const svgCoords = coords.map(({ x, y }) => ({
        x: (width - x / (range?.max - range?.min)) * width,
        y: width - (y / (rangeY?.max - rangeY?.min)) * width,
      }));
      return svgCoords;
    }
  };

  // const Line = () => {
  //   if (width && rangeY) {
  //     const range = rangeY?.max - rangeY?.min;
  //     console.log((Math.abs(coords[0].y) / range) * width);
  //     return (
  //       <svg
  //         pointerEvents={"none"}
  //         className={styles.line}
  //         width={width}
  //         height={width}
  //         viewBox={`0 0 ${width} ${width}`}
  //       >
  //         {/* <path d=""></path> */}
  //         <line
  //           x1={0}
  //           // y1={0}
  //           x2={width}
  //           y2={width}
  //           // x1={0}
  //           y1={(Math.abs(coords[0].y) / range) * width}
  //           // x2={width}
  //           // y2={Math.abs(coords.at(-1).y / range) * width}
  //           stroke="black"
  //         ></line>
  //       </svg>
  //     );
  //   } else return <></>;
  // };
  const getLine = () => {
    const svgCoords = getSvgCoords();
    if (svgCoords) {
      let path = `M ${svgCoords[0].x} ${svgCoords[0].y} `;
      for (let i = 1; i < svgCoords.length; i++) {
        path += `L ${svgCoords[i].x} ${svgCoords[i].y} `;
      }
      return path;
    }
  };
  const [line, setLine] = useState<string>();
  useEffect(() => {
    setLine(getLine());
  }, [width]);

  const Line = () => {
    return (
      <svg
        // style={{
        //   position: "absolute",
        // }}
        pointerEvents={"none"}
        className={styles.line}
        width={width}
        height={width}
        viewBox={`0 0 ${width} ${width}`}
      >
        {line && <path stroke="black" d={line}></path>}
      </svg>
    );
    // } else return <></>;
  };

  return (
    <CustomComponent id={id} style={{ width: "max-content" }}>
      <div ref={axis as any} className={styles.linechart}>
        {<Line />}
        {/* {rangeY &&
          coords.map(({ x, y }: { x: number; y: number }, i: number) => {
            const range = rangeY?.max - rangeY?.min;
            return (
              <>
                <span
                  style={{
                    left: `calc(${i * 20}% +0)`,
                    top: `calc(${Math.abs(y * 100) / range}% + 1.1em)`,
                  }}
                  className={styles.coord}
                  key={"coord-" + i}
                ></span>
              </>
            );
          })} */}
        {/* <Axis /> */}
        <div className={styles["x-axis"]}></div>
        <div className={styles["y-axis"]}></div>
      </div>
    </CustomComponent>
  );
}
