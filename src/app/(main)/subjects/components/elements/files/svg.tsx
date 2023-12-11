import React from "react";
// 1.- Crea el SVG
// 2.- Comprimelo
// 3.- Conviertelo a Data URI con https://codepen.io/elliz/details/ygvgay

type SizesTypes = "sm" | "md" | "lg" 

export default function Svg({
  id,
  options: { svg,size } = { svg: "", size: "sm" },
}: {
  id: string;
  options: { svg: string; size: SizesTypes };
}) {
  const sizes = {
    sm: "1em",
    md: "8em",
    lg: "12em", 
  } as any

  return (
    <div
      data-component={id}
      style={{ backgroundImage: `url("${svg}")`, height: sizes[size] }}
      className="w-full h-80 overflow-auto m-[1em] bg-contain bg-no-repeat bg-center"
    ></div>
  );
}
