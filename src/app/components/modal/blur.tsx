'use client'
import React, { Dispatch, SetStateAction } from "react";

export default function Blur({
  state,
  setState,
}: {
  state: boolean;
  setState: Dispatch<SetStateAction<boolean>>;
}) {
  console.log(state)
  return (
    <div
    key={'blur'}
      onClick={()=>setState(false)}
      className={`cursor-default fixed z-40 top-0 left-0 opacity-0 h-full w-full bg-slate-900/50 transition-all duration-500
    ${state ? "opacity-100" : "animate-hide"}`}
    ></div>
  );
}
