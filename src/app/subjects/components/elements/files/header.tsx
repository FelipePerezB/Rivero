import React from "react";
import Title from "./title";

export default function Header({
  id,
  options: { subtitle, title } = { subtitle: "Subtítulo", title: "Título" },
}: {
  id: string;
  options: { title: string; subtitle: string };
}) {
  return (
    <section data-component={id} className="w-full mb-[0.8em]">
      <div className="flex flex-col pb-[2.4em] pt-[1.2em] md:pb-[3em] md:pt-[2em] print:pt-0">
        <Title options={{ size: "h1", text: title }} />
        <Title options={{ size: "h2", text: subtitle }} />
      </div>
      <hr />
    </section>
  );
}
