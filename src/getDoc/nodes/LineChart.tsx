import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import styles from "../styles/reportTemplate.module.css";
import CustomComponent from "./CustomComponent";

const getCoords = (m: number = 1, n: number = 0) => {
  let coords = [];
  for (let i = 0; i <= 5; i++) {
    coords.push([String(i), i * m + n]);
  }
  return coords;
};

export default function LineChart({
  size = "medium",
  ecuations,
  datasets,
  id,
}: {
  ecuations?: {
    n?: number;
    m?: number;
  }[];
  size?: "small" | "medium";
  datasets?: {
    coords: (string | number)[][];
    label: string;
  }[];
  id: string;
}) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip
  );

  let borderWidth = 2.4;
  if (size === "small") {
    borderWidth = 1.5;
  }

  const chartData = {
    // datasets: datasets
    //   ? datasets.map(({ coords, label }, i) => ({
    //       label: label,
    //       data: coords.map((coord) => ({
    //         x: coord[0],
    //         y: coord[1],
    //       })),
    //       backgroundColor: "black",
    //       borderColor: "black",
    //       borderWidth: borderWidth,
    //       pointRadius: 0.8,
    //       // borderDash: [30, i * 5],
    //     }))
    datasets: ecuations?.map(({ m, n }, i) => ({
      label: `${m || ""}x + ${n || "0"} = y`,
      data: getCoords(m as number, n as number).map((coord) => ({
        x: coord[0],
        y: coord[1],
      })),
      backgroundColor: "black",
      borderColor: "black",
      borderWidth: borderWidth,
      pointRadius: 0.8,
      // borderDash: [30, i * 5],
    })),
    //  getCoords(ecuation?.m as number, ecuation?.n as number),
    //     backgroundColor: "#676767",
  };
  return (
    <CustomComponent active={false} id={id} style={{width: "max-content"}}>
      <div className={styles[`${size}-chart`]}>
        <Line
          data={chartData as any}
          className={styles.chart}
          options={{
            aspectRatio: 1,
            devicePixelRatio: 3,
            scales: {
              x: {
                ticks: {
                  color: "black",
                  font: {
                    size: 10,
                  },
                },
                grid: { display: false },
                border: {
                  width: borderWidth,
                  color: "black",
                },
              },
              y: {
                ticks: {
                  stepSize: 1,
                  color: "black",
                  font: {
                    size: 10,
                  },
                },
                border: {
                  width: borderWidth,
                  color: "black",
                },
                grid: { display: false },
              },
            },
          }}
        />
      </div>
    </CustomComponent>
  );
}
