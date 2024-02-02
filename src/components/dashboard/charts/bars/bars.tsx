import Bar from "./bar";

export default function BarsChart({
  data,
  minSize,
}: {
  data: { label?: string; value: number | string }[];
  minSize?: number;
}) {
  const chartData = minSize
    ? [
        ...data,
        ...Array(minSize - data?.length ?? 0).fill({ time: "---", value: 0 }),
      ]
    : data;

  const values = chartData.map((item) => Number(item.value));
  const maxValue = Math.max(...values);
  const minValue = Math.min(...values);
  const dataWithPersentage = chartData.map((bar) => ({
    ...bar,
    percentage: (Number(bar?.value) * 100) / maxValue,
  }));

  return (
    <div className="flex w-full gap-xs p-sm justify-center pt-sm items-end h-full">
      {dataWithPersentage.map(({ percentage, value, label }, i) => (
        <div
          key={`bar-${i}-${percentage}%`}
          className="flex flex-col w-full h-full items-center max-w-[60px] justify-end"
        >
          <div className="w-full h-full flex items-end">
            <Bar height={percentage ?? 1} active>
              <span className="absolute top-0 text-white opacity-0 group-hover:opacity-100 group-hover:-translate-y-6 group-hover:text-black transition-all duration-150">
                {value}
              </span>
            </Bar>
          </div>
          <span className="min-w-max">{label ?? "/"}</span>
        </div>
      ))}
    </div>
  );
}
