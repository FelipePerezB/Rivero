import React, { ReactNode } from "react";
import { Component } from "src/app/documents/edit/models/component";
import DynamicElement from "./dynamic-file";

const rows = 4;
const cols = 3;
const totalPoints = 11;

// const coordinates = generateGridCoordinates(rows, cols, totalPoints);
// console.log(coordinates);

export default function Set({
  options: { name, set, children } = { name: "Conjunto", set: "1,5,2,7,12,23" },
  id,
}: {
  id?: string;
  options: { name: string; set: string; children?: Component[] };
}) {
  const ROWS = 3;
  const skip = children ? 4 : 0;
  const COLS = 8 ;
  const cols = COLS -skip
  const total = cols * ROWS;
  console.log(children);
  const values = set.split(",");
  const ratio = Math.floor(total / (values.length - 1));
  const child = children?.at(0);
  // console.log(coords);
  return (
    <div
      style={{
        gridTemplateColumns: `repeat(${COLS}, 1fr)`,
        gridTemplateRows: `repeat(${ROWS}, 1fr)`,
      }}
      className="grid justify-center items-center w-11/12 h-full mx-auto aspect-[8/1] outline outline-[0.125em] outline-black rounded-sm p-[0.8em]"
      data-component={id}
    >
      {child?.id && (
        <div className="row-start-1 text-[0.8em] row-end-4 col-start-1 col-end-5 w-full h-full pr-[1em]">
          <DynamicElement
            key={`set-${child.id}`}
            attrs={{ ...child }}
            name={child.type}
          />
        </div>
      )}
      <span
        style={{ gridColumnStart: COLS, gridRowStart: 1 }}
        className="text-center font-bold scale-150"
      >
        {name}
      </span>
      {values?.map((_, i) => {
        const index = (i+1) * ratio;
        // console.log(cols)
        // let col = (index % (COLS - skip)); // Posición en el eje X
        let col = index % cols+1; // Posición en el eje X
        console.log(index);
        const row = Math.round(index / cols);
        const sigma = row % 2 === 0 ? 1 : 0;
        col+=sigma;
        // 6 % 8 = 2
        return (
          <div
            className="text-center w-max"
            key={`set-${id}`}
            style={{ gridRowStart: row, gridColumnStart: col+skip }}
          >
            {values[i]}
          </div>
        );
      })}
    </div>
  );
}
