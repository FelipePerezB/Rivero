'use client'
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import * as venn from "venn.js";

export default function Venn({
  id,
  options,
}: {
  id: string;
  options: { data?: { sets?: string; value?: string }[] };
}) {
  const divRef = useRef<HTMLDivElement>(null);
  const data = options?.data?.map(({ sets, value }) => ({
    sets: sets?.split(","),
    size: Number(value),
  }));

  useEffect(() => {
    const sets = data?.length
      ? data
      : [
          { sets: ["A"], size: 12 },
          { sets: ["B"], size: 1 },
          { sets: ["A", "B"], size: 6 },
        ];
    try {
      const d3Venn = venn as any;
      var chart = d3Venn
        .VennDiagram()
        .wrap(false)
        .fontSize("1em")
        .width(divRef.current?.clientWidth)
        .height(divRef.current?.clientHeight);
      d3.select(divRef.current).datum(sets).call(chart);
    } catch (error) {}
  }, [options]);

  return (
    <div className="h-[16em] w-[12em]" data-component={id} ref={divRef}></div>
  );
}
