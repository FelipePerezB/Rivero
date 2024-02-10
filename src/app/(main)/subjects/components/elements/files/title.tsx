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
      <h1 className="text-[1.8em] font-extrabold sm:text-[2.4em] md:text-[2.8em]">
        {text}
      </h1>
    ),
    h2: <h2 className="text-[1.25em] sm:text-[1.4em] font-semibold">{text}</h2>,
    h3: <h3 className="text-[1.1em]/[1em] font-bold">{text}</h3>,
  };
  return <div className="w-full" data-component={id}>{sizes[size]}</div>;
}
