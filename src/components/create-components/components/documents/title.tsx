import React, { useEffect } from "react";

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
      <h1 className="text-[2em] font-bold">
        {text}
      </h1>
    ),
    h2: <h2 className="text-[1.3em] font-semibold">{text}</h2>,
    h3: <h3 className="text-[1.1em] font-semibold">{text}</h3>,
  };
  return <div data-component={id}>{sizes[size]}</div>;
}
