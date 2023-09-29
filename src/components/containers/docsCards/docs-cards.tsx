import Card from "@components/Card";

export default function DocsCards({ docs }: { docs?: {}[] }) {
  return (
    // <section className="flex justify-center  flex-wrap gap-4">
    <>
      {docs?.map((_, i) => (
        <Card
          key={`doc-card-${i}`}
          interactive
          className="w-4/12 sm:w-32 aspect-[4/5] text-xs"
        ></Card>
      ))}
    </>
    // </section>
  );
}
