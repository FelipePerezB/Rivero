import React from "react";

const Bar = ({
  height,
  value,
}: {
  height?: number;
  value: number | string;
}) => {
  return (
    <div
      style={{ height: `${height || 1}%` }}
      className="w-full h-full bg-blue-500 hover:scale-105 hover:bg-blue-700 transition-all duration-200 rounded-[2px] cursor-pointer relative flex justify-center group"
    >
      <span className="absolute top-0 text-white opacity-0 group-hover:opacity-100 group-hover:-translate-y-6 group-hover:text-black transition-all duration-150">
        {value}
      </span>
    </div>
  );
};

export default function BarsChart({
  data,
}: {
  data: { label?: string; value: number | string }[];
}) {
  const values = data.map((item) => Number(item.value));
  const maxValue = Math.max(...values);
  const dataWithPersentage = data.map((data) => ({
    ...data,
    percentage: (Number(data?.value) * 100) / maxValue,
  }));

  return (
    <div className="flex w-full gap-xs p-sm justify-center pt-lg items-end h-full">
      {dataWithPersentage.map(({ percentage, value, label }, i) => (
        <div
          key={`bar-${i}-${percentage}%`}
          className="flex flex-col w-full h-full items-center max-w-[60px] justify-end"
        >
          <Bar value={value} height={percentage} />
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}
