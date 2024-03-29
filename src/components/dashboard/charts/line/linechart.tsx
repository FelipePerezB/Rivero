/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { createChart, ColorType } from "lightweight-charts";
import React, { useEffect, useRef } from "react";

export const ChartComponent = ({
  series,
}: {
  series: {
    data: { time: string; value: number }[];
    colors?: {
      backgroundColor: string;
      lineColor: string;
      textColor: string;
      areaTopColor: string;
      areaBottomColor: string;
    };
  }[];
}) => {
  // const {
  //   data,
  //   colors: {
  //     backgroundColor = "white",
  //     lineColor = "#2962FF",
  //     textColor = "black",
  //     areaTopColor = "#2962FF",
  //     areaBottomColor = "rgba(41, 98, 255, 0.28)",
  //   } = {},
  // } = props;

  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;
    const handleResize: any = () => {
      if (!chartContainerRef.current) return;
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid },
        // textColor,
      },
      width: chartContainerRef.current.clientWidth,
      height: 300,
    });
    chart.timeScale().fitContent();
    series.forEach(({ data, colors }) => {
      const serie = chart.addLineSeries();
      serie.setData(data);
    });

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      chart.remove();
    };
  }, []);

  return <div ref={chartContainerRef} />;
};
