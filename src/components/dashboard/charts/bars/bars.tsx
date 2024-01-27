import Bar from "./bar";

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
          <Bar height={percentage ?? 1} active>
            <span className="absolute top-0 text-white opacity-0 group-hover:opacity-100 group-hover:-translate-y-6 group-hover:text-black transition-all duration-150">
              {value}
            </span>
          </Bar>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}
