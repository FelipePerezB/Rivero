"use client";
import { ArcElement, Chart } from "chart.js";
import React from "react";
import { Pie } from "react-chartjs-2";

export default function PieChart({color}:{color: string}) {
  Chart.register(ArcElement);
  const data = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "My First Dataset",
        data: [100, 70],
        backgroundColor: [
          "white",
          color,
          // 'rgb(255, 99, 132)',
          // 'rgb(54, 162, 235)',
          // 'rgb(255, 205, 86)'
        ],
        hoverOffset: 4,
      },
    ],
  };
  return <Pie data={data} />;
}
