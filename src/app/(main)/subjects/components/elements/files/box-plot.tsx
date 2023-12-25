"use client";
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

export default function BoxPlot({
  options,
  id,
}: {
  options: { data?: string };
  id: string;
}) {
  const divRef = useRef<HTMLDivElement>(null);
  // const div = divRef.current
  useEffect(() => {
    if (!divRef.current?.clientWidth) return;
    const clientWith = divRef.current.clientWidth;
    var margin = {
        top: clientWith / 20,
        right: clientWith / 120,
        bottom: clientWith / 8,
        left: clientWith / 8,
      },
      width = divRef.current?.clientWidth - margin.left - margin.right,
      height = divRef.current?.clientHeight - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select(divRef.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const recibedData = options?.data
      ?.split(",")
      ?.map((value) => Number(value));
      
    // create dummy data
    var data = recibedData?.at(1)
      ? recibedData
      : [12, 19, 11, 13, 12, 22, 13, 4, 15, 16, 18, 19, 20, 12, 11, 9];

    // Compute summary statistics used for the box:
    var data_sorted = data.sort(d3.ascending);
    var q1 = d3.quantile(data_sorted, 0.25) ?? 0;
    var median = d3.quantile(data_sorted, 0.5) ?? 0;
    var q3 = d3.quantile(data_sorted, 0.75) ?? 0;
    var min = data_sorted[0];
    var max = data_sorted?.at(-1) ?? 0

    // Show the Y scale
    var y = d3
      .scaleLinear()
      .domain([min, max])
      .range([height, 0]);
    svg.call(d3.axisLeft(y));

    // a few features for the box
    var center = clientWith / 2;
    var width = clientWith / 3;

    // Show the main vertical line
    svg
      .append("line")
      .attr("x1", center)
      .attr("x2", center)
      .attr("y1", y(min))
      .attr("y2", y(max))
      .attr("stroke", "black");

    // Show the box
    svg
      .append("rect")
      .attr("x", center - width / 2)
      .attr("y", y(q3 ?? 0))
      .attr("height", y(q1) - y(q3 ?? 0))
      .attr("width", width)
      .attr("stroke", "black")
      .style("fill", "white");

    // show median, min and max horizontal lines
    svg
      .selectAll("toto")
      .data([min, median, max])
      .enter()
      .append("line")
      .attr("x1", center - width / 2)
      .attr("x2", center + width / 2)
      .attr("y1", function (d) {
        return y(d);
      })
      .attr("y2", function (d) {
        return y(d);
      })
      .attr("stroke", "black");
    return () => {
      if (!divRef.current) return;
      // eslint-disable-next-line react-hooks/exhaustive-deps
      divRef.current.innerHTML = "";
    };
  }, [options]);

  // </script>
  return (
    <div className="h-[16em] w-[12em]" data-component={id} ref={divRef}></div>
  );
}
