"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";

export type LineChartProps = {
  settings: ChartData<"line", (number | null)[], string>;
  showLegend?: boolean;
};

export default function LineChart({ settings, showLegend }: LineChartProps) {
  ChartJS.register(
    CategoryScale,
    Legend,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip
  );

  return (
    <Line
      data={settings}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: showLegend,
            position: "bottom",
            align: "start",
          },
        },
      }}
    />
  );
}
