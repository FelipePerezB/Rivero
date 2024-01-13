import { ChartData } from "chart.js";
import LineChart, { LineChartProps } from "./line";
import Card from "@components/cards/Card";

export default function LineChartCard({
  title,
  settings: { data, showLegend },
}: {
  title?: string;
  settings: {
    data: {
      label: string;
      values: (number | string)[];
    }[];
    showLegend: boolean;
  };
}) {
  const colors = ["#58a6ff", "#7c58ff", "#ae58ff", "#ee00ab"];
  const settings = {
    labels: data[0].values?.map((_, i) => `N°${i + 1}`),
    datasets: data?.map(({ label, values }, i) => {
      const index = parseInt(String(i / colors.length)) * -colors.length + i;
      const color = colors[index];
      return {
        label,
        data: values,
        pointRadius: 2.5,
        backgroundColor: color,
        borderColor: color,
        hidden: i >= 3,
      };
    }),
  } as ChartData<"line", (number | null)[], string>;
  
  return (
      <div className="h-full">
        <LineChart {...{ settings, showLegend }} />
      </div>
  );
}
