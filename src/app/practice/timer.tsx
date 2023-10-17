"use client";
import { ProgressVar } from "@components/ProgressVar";
import { useEffect, useState } from "react";

// let start = 60 * 2;
const format = (time: number) => (`${time}`.length > 1 ? time : `0${time}`);

export default function Timer({
  bonus = 0,
  startTime = 60 * 2,
}: {
  bonus: number;
  startTime?: number;
}) {
  const [count, setCount] = useState(startTime);
  const [maxTime, setMaxTime] = useState(startTime);

  const time = !(count + bonus < 0) ? count + bonus : 0;
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  useEffect(() => {
    if (time > maxTime) setMaxTime(time);
  }, [maxTime, time]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((time) => {
        if (time === 0) clearInterval(timer);
        return time - 1;
      });
    }, 1000);
    return function () {
      setCount(startTime);
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
      <ProgressVar progress={Math.floor((100 * time) / maxTime)} />
    </div>
  );
}
