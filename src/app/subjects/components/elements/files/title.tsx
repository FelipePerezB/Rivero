import React, { useEffect, useState } from "react";

export default function Title({
  id,
  options: { size = "h1", text = "TITLE" } = {},
}: {
  type?: string;
  id?: string;
  options: {
    text?: string;
    size?: "h1" | "h2" | "h3";
  };
}) {
  const sizes = {
    h1: (
      <h1 className="text-[2.4em]/[1.4em] font-bold">
        {text}
      </h1>
    ),
    h2: <h2 className="text-[1.6em]/[1.2em]">{text}</h2>,
    h3: <h3 className="text-[1.1em]/[1em] font-semibold">{text}</h3>,
  };
  return <div className="w-max" data-component={id}>{sizes[size]}</div>;
}
