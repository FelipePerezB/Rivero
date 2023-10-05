import NavigationCard from "@components/cards/navigationCard/NavigationCard";
import LineChartCard from "src/app/components/charts/line/line-card";

export default function EvaluationsPage() {
  const datasets = [
    {
      label: "4° Medio A",
      values: [700, 750, 780, 800],
    },
    {
      label: "3° Medio A",
      values: [700, 700, 730, 740],
    },
    {
      label: "2° Medio A",
      values: [600, 670, 710, 740],
    },
  ];

  return (
    <>
      <LineChartCard
        settings={{ data: datasets, showLegend: true }}
        title="Evolución de puntajes"
      />
      <div className="mt-2 w-full flex flex-col gap-2.5">
        <NavigationCard href="/">Ensayo N°1</NavigationCard>
        <NavigationCard href="/">Ensayo N°2</NavigationCard>
        <NavigationCard href="/">Ensayo N°3</NavigationCard>
        <NavigationCard href="/">Ensayo N°4</NavigationCard>
        <NavigationCard href="/">Ensayo N°5</NavigationCard>
        <NavigationCard href="/">Ensayo N°6</NavigationCard>
        <NavigationCard href="/">Ensayo N°7</NavigationCard>
        <NavigationCard href="/">Ensayo N°8</NavigationCard>
        <NavigationCard href="/">Ensayo N°9</NavigationCard>
        <NavigationCard href="/">Ensayo N°10</NavigationCard>
      </div>
    </>
  );
}
