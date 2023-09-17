import Card from "@components/Card";

export default function DocsCards({ docs }: { docs?: {}[] }) {
  return (
    <section className="flex justify-center  flex-wrap gap-4">
      {docs?.map((_, i) => (
        <Card
          key={`doc-card-${i}`}
          interactive
          className="flex items-end w-28 h-36 text-xs "
        ></Card>
      ))}
    </section>
  );
}
