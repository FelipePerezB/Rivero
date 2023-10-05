"use client";
import { ProgressVar } from "@components/ProgressVar";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

// let start = 10;
let start = 60 * 5.5;
let end = 0;

const format = (time: number) => (`${time}`.length > 1 ? time : `0${time}`);

export default function Timer({ bonus = 0 }: { bonus: number }) {
  // const router = useRouter();
  const [count, setCount] = useState(start);
  // const [maxCount, setMaxCount] = useState(start);
  const time = count + bonus;
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  useEffect(() => {
    const timer = setInterval(() => {
      start -= 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, 1000);
    return function () {
      setCount(start);
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="w-full pb-4 flex justify-center gap-2 flex-col ">
      <span className="flex">
        <span className="mr-1 font-semibold">Tiempo restante:</span>
        <span>{format(minutes)}</span>
        <span>:</span>
        <span>{format(seconds)}</span>
      </span>
      <ProgressVar progress={Math.floor((100 * time) / start)} />
    </div>
  );
}
