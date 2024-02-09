import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

export default function BoxPlot({
  options,
  id,
}: {
  options: { data?: string ,   direction?: string};
  id: string;
}) {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!divRef.current?.clientWidth) return;
    const clientWith = divRef.current.clientWidth;
    var margin = {
        top: 0,
        right: clientWith / 120,
        bottom: clientWith / 8,
        left: clientWith / 120,
      },
      width = divRef.current?.clientWidth - margin.left - margin.right,
      height = divRef.current?.clientHeight - margin.top - margin.bottom;

    var svg = d3
      .select(divRef.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const receivedData = options?.data?.split(",")?.map((value) => Number(value));
      
    var data = receivedData?.at(1)
      ? receivedData
      : [12, 19, 11, 13, 12, 22, 13, 4, 15, 16, 18, 19, 20, 12, 11, 9];

    var data_sorted = data.sort(d3.ascending);
    var q1 = d3.quantile(data_sorted, 0.25) ?? 0;
    var median = d3.quantile(data_sorted, 0.5) ?? 0;
    var q3 = d3.quantile(data_sorted, 0.75) ?? 0;
    var min = data_sorted[0];
    var max = data_sorted?.at(-1) ?? 0;

    var x = d3
      .scaleLinear()
      .domain([min, max])
      .range([0, width]);
    svg.append("g").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(x));

    var center = height / 2;
    var heightBox = height / 3;

    svg
      .append("line")
      .attr("y1", center)
      .attr("y2", center)
      .attr("x1", x(min))
      .attr("x2", x(max))
      .attr("stroke", "black");

    svg
      .append("rect")
      .attr("y", center - heightBox / 2)
      .attr("x", x(q1))
      .attr("width", x(q3) - x(q1))
      .attr("height", heightBox)
      .attr("stroke", "black")
      .style("fill", "white");

    svg
      .selectAll("toto")
      .data([min, median, max])
      .enter()
      .append("line")
      .attr("y1", center - heightBox / 2)
      .attr("y2", center + heightBox / 2)
      .attr("x1", function (d) {
        return x(d);
      })
      .attr("x2", function (d) {
        return x(d);
      })
      .attr("stroke", "black");

    return () => {
      if (!divRef.current) return;
      divRef.current.innerHTML = "";
    };
  }, [options]);

  return (
    <div className="h-[8em] w-[16em] mx-auto" data-component={id} ref={divRef}></div>
    // <div className="h-[16em] w-[12em]" data-component={id} ref={divRef}></div>
  );
}
